import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";

export async function GET() {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 }
    );
  }

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks, { status: 200 });
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { title, description, status, priority, dueDate } = body;

  if (!title) {
    return NextResponse.json(
      { message: "Título é obrigatório." },
      { status: 400 }
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      dueDate,
      userId,
    },
  });

  return NextResponse.json(task, { status: 201 });
}