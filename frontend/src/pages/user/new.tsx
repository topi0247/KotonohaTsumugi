import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/providers/auth";

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(name, email, password, passwordConfirmation);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="m-auto py-5">
      <h2 className="text-2xl m-4 text-center">新規登録</h2>
      <section className="bg-white p-5 w-[400px] m-auto">
        <form
          className="text-center flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <TextField
            id="name"
            label="なまえ"
            variant="standard"
            placeholder="あくたがわ"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="email"
            label="メールアドレス"
            variant="standard"
            type="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="パスワード"
            variant="standard"
            type="password"
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="password_confirmation"
            label="パスワード確認"
            variant="standard"
            type="password"
            placeholder="******"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="">
            <Button variant="outlined" type="submit">
              新規登録
            </Button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default SignUp;
