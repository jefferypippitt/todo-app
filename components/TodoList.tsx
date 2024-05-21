"use client";

import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteTodo } from "@/app/actions/deleteTodo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onDelete }: TodoListProps) {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      onDelete(id);
      toast({
        variant: "destructive",
        title: "Todo deleted",
        description: "The todo has been removed from the database.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete todo",
      });
    }
  };

  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between px-4 py-2 rounded shadow my-2">
          <span className="text-medium">{todo.title}</span>
          <Button 
            variant="destructive"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
