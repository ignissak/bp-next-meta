import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (request) => {
  if (!request.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const progress = prisma.progress.findMany({
    where: {
      userId: request.auth.user?.id,
    },
  });

  return NextResponse.json({ progress });
}) as any;
