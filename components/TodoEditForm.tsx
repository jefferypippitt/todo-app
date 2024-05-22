"use client";

import { useForm } from "react-hook-form";
import { Todo } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateTodo } from "@/app/actions/updateTodo";

const TodoSchema = z.object({
  title: z.string().min(1, { message: "Todo title is required." }),
});

interface TodoEditFormProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onCancel: () => void;
}

export function TodoEditForm({ todo, onUpdate, onCancel }: TodoEditFormProps) {
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: todo.title,
    },
  });

  async function onSubmit(data: z.infer<typeof TodoSchema>) {
    try {
      const updatedTodo = await updateTodo(todo.id, data.title);
      onUpdate(updatedTodo);
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Input {...form.register("title")} placeholder="Edit todo title" />
      <Button type="submit">Save</Button>
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}
