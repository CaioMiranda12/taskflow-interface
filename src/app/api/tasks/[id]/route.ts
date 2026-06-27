import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromToken } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const body = await request.json();
  const { title, description, status, priority, dueDate } = body;

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task || task.userId !== userId) {
    return NextResponse.json(
      { message: "Tarefa não encontrada." },
      { status: 404 }
    );
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, description, status, priority, dueDate },
  });

  return NextResponse.json(updatedTask, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: "Não autorizado." },
      { status: 401 }
    );
  }

  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task || task.userId !== userId) {
    return NextResponse.json(
      { message: "Tarefa não encontrada." },
      { status: 404 }
    );
  }

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json(
    { message: "Tarefa removida com sucesso." },
    { status: 200 }
  );
}