import { NextAuthConfig } from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export default {
  providers: [
    Auth0({
      clientId: process.env.AUTH_AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH_AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH_AUTH0_ISSUER_BASE_URL,
    }),
  ],
} satisfies NextAuthConfig;
