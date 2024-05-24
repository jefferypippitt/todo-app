"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const deleteTodo = async (id: number) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      console.warn(`Todo with ID ${id} does not exist`);
      return; // Exit early if the todo doesn't exist
    }

    await prisma.todo.delete({
      where: { id },
    });

    // Revalidate the path to refresh the data
    revalidatePath('/');
    
  } catch (e) {
    console.error(e);
    throw new Error('Failed to delete todo');
  }
};
