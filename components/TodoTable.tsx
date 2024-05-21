"use client";

import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteTodo } from "@/app/actions/deleteTodo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface TodoTableProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export function TodoTable({ todos, onDelete }: TodoTableProps) {
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
    <Table className="mt-4">
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableHead className="w-[100px]">title</TableHead>
            <TableCell>{todo.title}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="destructive"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
