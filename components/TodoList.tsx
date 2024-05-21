"use client";

import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow my-2">
          <span className="text-lg text-black">{todo.title}</span>
          <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
