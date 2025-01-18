import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async (user) => {
      return !!user;
    },
    session: async ({ session, token, user }) => {
      const userRecord = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: userRecord?.id || undefined,
        },
      };
    },
  },
});
