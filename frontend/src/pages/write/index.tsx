import { useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";

const Write = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [textCount, setTextCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(e.target.value);
    setTextCount(text.length);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <article className="mr-32 w-full">
      <section className="relative w-full ml-auto flex flex-col py-10">
        <div className="text-4xl mx-1 flex justify-between items-center">
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
        <div className="mx-5 max-w-[1000px] w-full p-5 bg-white">
          <textarea
            className="resize-none leading-[calc(24px+25px)] h-[600px] focus:outline-none text-2xl tracking-widest px-3 overflow-hidden w-full break-all"
            onChange={handleChange}
            value={text}
            placeholder="徒然なるままに"
          />
        </div>
      </section>
      <div className="horizontal-tb my-10 mr-[10px]">
        <p>文字数：{textCount} / 400</p>
      </div>
    </article>
  );
};

export default Write;
