"use client";

import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void; // Add the onDelete prop
}

export default function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between px-4 py-2 rounded shadow my-2">
          <span className="text-medium">{todo.title}</span>
          <Button 
            variant={"destructive"}
            onClick={() => onDelete(todo.id)} // Call onDelete with the todo id
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
