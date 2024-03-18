import { useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import { SSNovel } from "@/types/typs";
import { useRead } from "@/providers/reading";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Reading } from "./reading";

const ReadIndex = () => {
  const { isReading, setIsReading } = useRead();
  const [novels, setNovels] = useState([] as SSNovel[]);
  const [readingId, setReadingId] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovels`,
        {
          method: "GET",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      const data = await response.json();
      setNovels(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleClick = (id: number) => {
    setReadingId(id);
    setIsReading(true);
  };

  const getBgColor = (index: number) => {
    const bgcolor = [
      "bg-white",
      "bg-blue-100",
      "bg-green-100",
      "bg-purple-100",
    ];
    return bgcolor[index];
  };

  return (
    <>
      <article
        className={`w-full mx-auto my-32 mr-16 horizontal-tb transition-all ${
          isReading ? "blur-sm" : ""
        }`}
      >
        <div className="w-full max-w-[1000px] m-auto  gap-x-6 gap-y-8 flex flex-row-reverse">
          {novels.map((novel, index) => (
            <section
              key={index}
              className="relative w-[500px] aspect-video vertical-rl cursor-pointer"
              onClick={() => handleClick(novel.id)}
            >
              {novel.ssnovel_bodies[3] && (
                <div
                  className={`absolute top-0 right-0  w-full h-full page4 transition-all shadow-lg
                  ${getBgColor(3)}`}
                />
              )}
              {novel.ssnovel_bodies[2] && (
                <div
                  className={`bg-green-100 absolute top-0 right-0  w-full h-full page3 transition-all shadow-lg
                  ${getBgColor(2)}`}
                />
              )}
              {novel.ssnovel_bodies[1] && (
                <div
                  className={`bg-blue-100 absolute top-0 right-0 w-full h-full transition-all shadow-md page2
                ${getBgColor(1)}`}
                />
              )}
              <div
                className={`bg-white absolute top-0 right-0 h-full w-hull flex flex-col gap-3 justify-start p-4 w-full shadow-sm hover:rotate-[3deg] transition-all page1 pb-8
                ${getBgColor(0)}`}
              >
                <h3 className="text-2xl text-start">{novel.title}</h3>
                <div className="text-end pb-3">
                  <p className="text-xl">{novel.ssnovel_bodies[0].user.name}</p>
                </div>
                <p
                  className={`text-clip overflow-hidden gradient-text whitespace-pre-wrap ${style.gradientText}`}
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
        </div>
      </article>
      {isReading && <Reading id={readingId} />}
    </>
  );
};

export default ReadIndex;
