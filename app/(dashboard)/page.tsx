"use client";

import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";
import { TodoForm } from "@/components/TodoForm";
import { useUser } from "@clerk/nextjs";
import { TodoTable } from "@/components/TodoTable";

import { deleteTodo } from "@/app/actions/deleteTodo";
import { getTodos } from "@/app/actions/getTodos";

export default function Page() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
      // Optional: Display an error message to the user
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl font-bold tracking-tight">Welcome back! 👋</h3>
        <p className="mt-4">You are logged in as <strong>{user?.firstName}</strong></p>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a list of your tasks
        </p>

        <TodoForm onAdd={handleAddTodo} />
        <TodoTable todos={todos} onDelete={handleDeleteTodo} />
      </div>
    </section>
  );
}
