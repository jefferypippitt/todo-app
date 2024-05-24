"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const updateTodo = async (id: number, title: string) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title },
    });

     // Revalidate the path to refresh the data
     revalidatePath('/');

    return updatedTodo;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to update todo');
  }
};
