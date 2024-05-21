"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const deleteTodo = async (id: number) => {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    revalidatePath('/');
  } catch (e) {
    console.error(e);
    throw e;
  }
};
