import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/providers/auth";
import Link from "next/link";
import FlashMessages from "../components/flash_messages";

const SignUp = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState([] as string[]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      setIsErrorMsg(["空欄があるよ", "埋めてね"]);
      return;
    }

    if (password !== passwordConfirmation) {
      setIsErrorMsg(["パスワードが一致しないよ", "もう一度確認してね"]);
      return;
    }

    if (password.length < 6) {
      setIsErrorMsg(["パスワードが短いよ", "6文字以上にしてね"]);
      return;
    }

    try {
      await signUp(name, email, password, passwordConfirmation)
        .then((data) => {
          router.push("/");
        })
        .catch(() => {
          setIsErrorMsg(["登録できないよ", "もう一度やってみてね"]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="absolute right-0 h-full w-screen mx-auto flex justify-center items-center pb-32 horizontal-tb">
      <div>
        <h2 className="text-2xl m-4 text-center">初めて綴る</h2>
        <section className="bg-white p-5 w-[400px] m-auto">
          <form
            className="text-center flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            {isErrorMsg.length > 0 && <FlashMessages text={isErrorMsg} />}
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
            <p className="text-xs text-start">※６文字以上</p>
            <TextField
              id="password_confirmation"
              label="パスワード確認"
              variant="standard"
              type="password"
              placeholder="******"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <div className="flex justify-center items-center flex-col gap-3">
              <Button variant="outlined" type="submit">
                初めて紡ぐ！
              </Button>
              <Link
                href="/login"
                className="border-b border-green-600 text-green-600"
              >
                紡いだことがある方はこちら
              </Link>
            </div>
          </form>
        </section>
      </div>
    </article>
  );
};

export default SignUp;
