import Link from "next/link";
export default function Home() {
  return (
    <main className="max-w-[1200px] m-auto">
      <h1 className="text-center text-bold text-4xl my-4">Hello World</h1>
      <div className="text-center text-2xl flex gap-2 justify-center items-center">
        <Link href="user/new">SignUp</Link>
        <Link href="login">Login</Link>
        <Link href="write/new">Write</Link>
      </div>
    </main>
  );
}
