import { Button, TextField } from "@mui/material";

const SignUp = () => {
  return (
    <article className="m-auto py-5">
      <h2 className="text-2xl m-4 text-center">新規登録</h2>
      <section className="bg-white p-5 w-[400px] m-auto">
        <form className="text-center flex flex-col gap-3">
          <TextField
            id="standard-basic"
            label="なまえ"
            variant="standard"
            placeholder="あくたがわ"
          />
          <TextField
            id="standard-basic"
            label="メールアドレス"
            variant="standard"
            type="email"
            placeholder="example@example.com"
          />
          <TextField
            id="standard-basic"
            label="パスワード"
            variant="standard"
            type="password"
            placeholder="******"
          />
          <TextField
            id="standard-basic"
            label="パスワード確認"
            variant="standard"
            type="password"
            placeholder="******"
          />
          <div className="">
            <Button variant="outlined">新規登録</Button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default SignUp;
