import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";

type TaskProps = {
  tasks: Task[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      date: task.createdAt.toISOString(),
    };
  });

  return {
    props: {
      data,
    },
  };
};

export default function Dashboard({ tasks }: TaskProps) {
  const [newTask, setNewTask] = useState("");

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    fetch("http://localhost:3000/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    });
  }

  return (
    <>
      <div className="bg-slate-600 h-screen">
        <h1>Dashboard</h1>
        <p>Está página deve ser acessada apenas por usuários logados.</p>
        <hr />
        <h2>Create Tasks</h2>
        <form action="" onSubmit={handleCreateTask}>
          <input
            type="text"
            name="newtask"
            id="newtask"
            onChange={(e) => setNewTask(e.target.value)}
            value={newTask}
            className="bg-slate-400"
          />
          <button type="submit">Adicionar</button>
        </form>

        <hr />
        <h2>Tasks</h2>
        <p>
          {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
        </p>
      </div>
    </>
  );
}
