"use client";

import { useState, useEffect } from "react";
import { Todo } from "@prisma/client";
import TodoList from "@/components/TodoList";
import { TodoForm } from "@/components/TodoForm";
import { useUser } from "@clerk/nextjs";
import { addTodo } from "@/app/actions/addTodo";
import { deleteTodo } from "@/app/actions/deleteTodo";

export default function Page() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos', error);
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
      console.error('Failed to delete todo', error);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <h3 className="text-2xl font-bold tracking-tight">
          Welcome back!
        </h3>
        <p className="mt-4">You are logged in as {user?.firstName}</p>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a list of your tasks
        </p>
        
        <TodoForm onAdd={handleAddTodo} />
        <TodoList todos={todos} onDelete={handleDeleteTodo} />
      </div>
    </section>
  );
}
