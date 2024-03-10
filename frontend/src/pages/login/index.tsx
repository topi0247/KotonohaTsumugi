import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { useAuth } from "@/providers/auth";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password).then((res) => {
      console.log(res);
    });
  };

  return (
    <article className="h-full w-full flex justify-center items-center pb-32 horizontal-tb">
      <div>
        <h2 className="text-2xl m-4 text-center">綴りたい？</h2>
        <section className="bg-white p-5 w-[400px] m-auto">
          <form
            className="text-center flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <TextField
              id="user[email]"
              label="メールアドレス"
              variant="standard"
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="user[password]"
              label="パスワード"
              variant="standard"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center items-center flex-col gap-3">
              <Button variant="outlined" type="submit">
                綴りに行く
              </Button>
              <Link
                href="user/new"
                className="border-b border-green-600 text-green-600"
              >
                初めて綴る
              </Link>
            </div>
          </form>
        </section>
      </div>
    </article>
  );
};

export default LoginPage;
