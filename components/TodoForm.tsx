"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Todo } from "@prisma/client"; // Import the Todo type from Prisma client
import { addTodo } from "@/app/actions/addTodo";

const TodoSchema = z.object({
  title: z.string().min(1, { message: "Todo title is required." }),
});

interface TodoFormProps {
  onAdd: (newTodo: Todo) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof TodoSchema>) {
    try {
      const newTodo = await addTodo(data.title);
      onAdd(newTodo); // Call onAdd to notify parent component
      form.reset();
      toast({
        title: "Success",
        description: "Todo added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add todo",
      });
    }
  }

  return (
    <div className="mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Todo</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new todo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
}
