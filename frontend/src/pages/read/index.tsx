import { useEffect, useState } from "react";
import style from "./index.module.css";
import { getCookie } from "typescript-cookie";

const data = {
  id: 1,
  title: "タイトル",
  username: "ユーザー名",
  created_at: "作成日",
  updated_at: "更新日",
  content:
    "本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文",
  pages: 1,
};

const novelsData = Array(50).fill(data);

type User = {
  id: number;
  name: string;
};

type SSNovelBody = {
  id: number;
  content: string;
  created_at: string;
  narrative_stage: string;
  user: User;
};

type SSNovel = {
  id: number;
  title: string;
  username: string;
  created_at: string;
  updated_at: string;
  ssnovel_bodies: SSNovelBody[];
};

const ReadIndex = () => {
  const [novels, setNovels] = useState([] as SSNovel[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovels`,
          {
            method: "GET",
            credentials: "include",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `_relay_writer_session=${getCookie(
                "_relay_writer_session"
              )}`,
            }),
          }
        );
        const data = await response.json();
        setNovels(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (novels.length === 0) return;
    const handleMouseEnter = (e: Event) => {
      const page1 = e.currentTarget as HTMLElement;
      const page2 = page1.previousSibling as HTMLElement;
      const page3 = page2?.previousSibling as HTMLElement;
      const page4 = page3?.previousSibling as HTMLElement;

      page2?.classList.add("rotate-[-4px]");
      page3?.classList.add("rotate-[-4deg]");
      page4?.classList.add("rotate-[-6deg]");
    };

    const handleMouseLeave = (e: Event) => {
      const page1 = e.currentTarget as HTMLElement;
      const page2 = page1.previousSibling as HTMLElement;
      const page3 = page2?.previousSibling as HTMLElement;
      const page4 = page3?.previousSibling as HTMLElement;

      page2?.classList.remove("rotate-[-4px]");
      page3?.classList.remove("rotate-[-4deg]");
      page4?.classList.remove("rotate-[-6deg]");
    };

    const page1Elements = document.querySelectorAll(".page1");
    page1Elements.forEach((page1) => {
      page1.addEventListener("mouseenter", handleMouseEnter);
      page1.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      page1Elements.forEach((page1) => {
        page1.removeEventListener("mouseenter", handleMouseEnter);
        page1.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [novels]);

  return (
    <>
      <article className="mx-5 my-32 grid grid-cols-2 gap-6 gap-y-8 horizontal-tb">
        {novels.map((novel, index) => (
          <section
            key={index}
            className="relative w-[500px] aspect-video vertical-rl"
          >
            {novel.ssnovel_bodies[3] && (
              <div className="bg-red-100 absolute top-0 right-0  w-full h-full page4 transition-all shadow-lg" />
            )}
            {novel.ssnovel_bodies[2] && (
              <div className="bg-green-100 absolute top-0 right-0  w-full h-full page3 transition-all shadow-lg" />
            )}
            {novel.ssnovel_bodies[1] && (
              <div className="bg-blue-100 absolute top-0 right-0 w-full h-full transition-all shadow-md page2" />
            )}
            <div className="bg-white absolute top-0 right-0 h-full w-hull flex flex-col gap-3 justify-start p-4 w-full shadow-sm hover:rotate-[3deg] transition-all page1 pb-8">
              <h3 className="text-2xl text-start">{novel.title}</h3>
              <div className="text-end pb-3">
                <p className="text-xl">{novel.ssnovel_bodies[0].user.name}</p>
              </div>
              <p
                className={`text-clip overflow-hidden gradient-text ${style.gradientText}`}
              >
                {novel.ssnovel_bodies[0].content}
              </p>
              <div className="horizontal-tb absolute bottom-0 left-0 flex gap-2 text-sm justify-start items-end text-start p-2 text-gray-400">
                <p>作成日 {novel.created_at}</p>
                <p>更新日 {novel.updated_at}</p>
              </div>
            </div>
          </section>
        ))}
      </article>
      {/* <article className="fixed w-full h-full z-10 right-0 top-0 flex justify-center items-center bg-black bg-opacity-30">
        <section className="bg-white max-w-[1200px] w-full aspect-video p-4 px-8 flex flex-col justify-center">
          <h2 className="text-4xl">タイトル</h2>
          <p className="text-end text-2xl">ユーザー名</p>
          <p className="text-end text-2xl">作成日</p>
          <p className="text-end text-2xl">更新日</p>
          <h3 className="mt-10 text-3xl text-gray-500">起</h3>
          <p className="mx-6 tracking-[0.25em] leading-10 text-2xl mt-4">
            本文
          </p>
        </section>
      </article> */}
    </>
  );
};

export default ReadIndex;
