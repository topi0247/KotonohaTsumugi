import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL as string)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <main className="max-w-[1200px] m-auto">
      <h1 className="text-center text-bold text-4xl my-4">Hello World</h1>
      <ul className="text-2xl text-center my-4">
        {tasks.map((task) => (
          <li key={task.id} className="pb-2">
            <span className="border-b border-slate-50">{task.title}</span>
          </li>
        ))}
      </ul>
      <div className="text-center text-2xl flex gap-2 justify-center items-center">
        <Link href="user/new">SignUp</Link>
        <Link href="write">Write</Link>
      </div>
    </main>
  );
}
