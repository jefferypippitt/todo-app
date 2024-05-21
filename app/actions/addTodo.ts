"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const addTodo = async (title: string) => {
  try {
    const newTodo = await prisma.todo.create({
      data: { title },
    });
    return newTodo;
    revalidatePath('/')
  } catch (e) {
    console.error(e);
    throw new Error('Failed to add todo');
  }
};
