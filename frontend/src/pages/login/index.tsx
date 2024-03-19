import { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@mui/material";
import { useAuth } from "@/providers/auth";
import FlashMessages from "@/pages/components/flash_messages";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState([] as string[]);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setIsErrorMsg(["空欄があるよ", "埋めてね"]);
      return;
    }
    login(email, password).then((res) => {
      if (res !== null) {
        router.push("/read");
      } else {
        setIsErrorMsg(["みつからないよ", "間違えてるかも…"]);
      }
    });
  };

  return (
    <article className="absolute right-0 h-full w-screen mx-auto flex justify-center items-center pb-32 horizontal-tb">
      <div>
        <h2 className="text-2xl m-4 text-center">紡ぎたい？</h2>
        <section className="bg-white p-5 w-[400px] m-auto">
          <form
            className="text-center flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {isErrorMsg.length > 0 && <FlashMessages text={isErrorMsg} />}
            <TextField
              id="session[email]"
              label="メールアドレス"
              variant="standard"
              type="email"
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="session[password]"
              label="パスワード"
              variant="standard"
              type="password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center items-center flex-col gap-3">
              <Button variant="outlined" type="submit">
                紡ぎにいく
              </Button>
              <Link
                href="user/new"
                className="border-b border-green-600 text-green-600"
              >
                初めて紡ぐ
              </Link>
            </div>
          </form>
        </section>
      </div>
    </article>
  );
};

export default LoginPage;
