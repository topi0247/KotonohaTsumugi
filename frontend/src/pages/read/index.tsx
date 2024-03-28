import { useCallback, useEffect, useState } from "react";
import { SSNovel } from "@/types";
import { useRead } from "@/providers/reading";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Reading from "./reading";
import Ssnovel from "./ssnovel";

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

  return (
    <>
      <article
        className={`w-full mx-auto my-32 mr-16 horizontal-tb transition-all opacity-0 animate-text-animation-op animation-delay-1 ${
          isReading ? "blur-sm" : ""
        }`}
      >
        <div className="w-full max-w-[1000px] m-auto grid grid-cols-2 gap-y-7 gap-x-8">
          {novels.map((novel) => (
            <Ssnovel key={novel.id} novel={novel} handleClick={handleClick} />
          ))}
        </div>
      </article>
      {isReading && <Reading id={readingId} />}
    </>
  );
};

export default ReadIndex;
