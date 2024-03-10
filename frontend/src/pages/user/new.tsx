import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
// import { useAuth } from "@/providers/auth";

const SignUp = () => {
  //const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: "test@test.com",
          password: "password",
          name: "test",
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.headers.get("Authorization"));
          const token = res.headers.get("Authorization");
          if (token) {
            localStorage.setItem("token", token);
          }
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((json) => console.dir(json))
      .catch((err) => console.error(err));
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
