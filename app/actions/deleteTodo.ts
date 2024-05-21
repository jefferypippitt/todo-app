"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const deleteTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
  
    });
    revalidatePath('/')

    if (!todo) {
      throw new Error(`Todo with ID ${id} does not exist`);
    }

    await prisma.todo.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
    throw new Error('Failed to delete todo');
  }
};
