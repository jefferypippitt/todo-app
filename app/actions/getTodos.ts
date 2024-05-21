"use server";

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const getTodos = async () => {
  try {
    const todos = await prisma.todo.findMany();
    revalidatePath('/')
    return todos;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch todos');
  }
};
