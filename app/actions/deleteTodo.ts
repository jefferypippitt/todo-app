"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteTodo = async (id: number) => {
  try {
    await prisma.todo.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to delete todo');
  }
};
