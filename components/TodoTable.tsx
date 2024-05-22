"use client";

import { useState } from "react";
import { Todo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteTodo } from "@/app/actions/deleteTodo";
import { updateTodo } from "@/app/actions/updateTodo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Pencil } from "@phosphor-icons/react";

interface TodoTableProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

export function TodoTable({ todos, onDelete, onUpdate }: TodoTableProps) {
  const { toast } = useToast();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newTitle, setNewTitle] = useState("");

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

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
  };

  const handleUpdate = async () => {
    if (editingTodo) {
      try {
        const updatedTodo = await updateTodo(editingTodo.id, newTitle);
        onUpdate(updatedTodo);
        setEditingTodo(null);
        toast({
          title: "Success",
          description: "Todo updated successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update todo",
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <Table className="mt-4">
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableHead className="w-[100px]">Task</TableHead>
              <TableCell>{todo.title}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="mr-2" onClick={() => handleEdit(todo)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  {editingTodo && editingTodo.id === todo.id && (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Todo</DialogTitle>
                        <DialogDescription>
                          Make changes to your todo here. Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" onClick={handleUpdate}>
                          Save changes
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
