import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { useAuth } from "@/providers/auth";

const SignInPage = () => {
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
    <article className="m-auto py-5">
      <h2 className="text-2xl m-4 text-center">ログイン</h2>
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
          <div className="">
            <Button variant="outlined" type="submit">
              ログイン
            </Button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default SignInPage;
