import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/router";
import { User } from "@/types/typs";
import { Button } from "@mui/material";

const Write = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({} as User);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [textCount, setTextCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    currentUser().then((data) => {
      if (data) {
        setUser(data);
      } else {
        router.push("/login");
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(e.target.value);
    setTextCount(text.length);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      title: title,
      content: text,
      narrative_stage: 0,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovel_bodies`,
      {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ssnovel_body: body }),
      }
    );

    if (response.status === 201) {
      router.push("/read");
    } else {
      alert("投稿に失敗しました");
    }
  };

  return (
    <article className="mr-32 w-full grid grid-cols-5">
      <section className="col-span-4 w-full ml-auto flex flex-col py-10 relative">
        <div className="text-4xl mx-1 flex justify-between items-center h-full">
          <input
            type="text"
            placeholder="タイトル"
            className="p-3 focus:outline-none h-full max-h-[700px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex m-4 text-bold justify-between items-center">
          <h3 className="text-3xl">起</h3>
          <h3 className="text-end text-2xl">{user?.name}</h3>
        </div>
        <div className="mx-5 max-w-[1000px] h-[600px] m-auto w-full p-5 bg-white">
          <textarea
            className="resize-none leading-[calc(24px+25px)] focus:outline-none text-2xl tracking-widest px-3 overflow-hidden w-full break-all"
            onChange={handleChange}
            value={text}
            placeholder="徒然なるままに"
          />
        </div>
      </section>
      <div className="col-span-1 w-full max-w-[1100px] my-10 horizontal-tb flex flex-col justify-center items-center gap-3">
        <Button variant="outlined" type="button" onClick={handleClick}>
          紡いだ
        </Button>
        <p>文字数：{textCount} / 400</p>
      </div>
    </article>
  );
};

export default Write;
