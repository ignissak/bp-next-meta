import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (request, { params }) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const courseId = (await params)?.courseId as string;
  const progress = prisma.progress.findMany({
    where: {
      userId: request.auth.user?.id,
      courseId: courseId,
    },
  });

  return NextResponse.json({ progress }, { status: 200 });
}) as any; // TODO: Temporary solution: https://github.com/nextauthjs/next-auth/issues/12224
