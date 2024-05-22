"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateTodo = async (id: number, title: string) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title },
    });
    return updatedTodo;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to update todo');
  }
};
