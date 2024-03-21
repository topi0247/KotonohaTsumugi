import { useAuth } from "@/providers/auth";
import { useCallback, useEffect, useState } from "react";
import { SSNovel } from "@/types/typs";
import { useRead } from "@/providers/reading";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Reading from "@/pages/read/reading";
import Ssnovel from "@/pages/read/ssnovel";

const UserIndex = () => {
  const { user } = useAuth();
  const { isReading, setIsReading } = useRead();
  const [novels, setNovels] = useState([] as SSNovel[]);
  const [novelsBegging, setNovelsBegging] = useState([] as SSNovel[]);
  const [novelsRising, setNovelsRising] = useState([] as SSNovel[]);
  const [novelsClimax, setNovelsClimax] = useState([] as SSNovel[]);
  const [novelsFalling, setNovelsFalling] = useState([] as SSNovel[]);
  const [novelsType, setNovelsType] = useState(0);
  const [readingId, setReadingId] = useState(0);

  const fetchData = useCallback(async () => {
    if (!user) return null;
    const getNovelsData = (data: SSNovel[], stage: string) => {
      return data.filter((ssnovel) =>
        ssnovel.ssnovel_bodies.some(
          (body) => body.user.id === user.id && body.narrative_stage === stage
        )
      );
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_ssnovels`,
        {
          method: "GET",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      const data = await response.json();

      const beginning = getNovelsData(data, "beginning");
      setNovelsBegging(beginning);

      const rising = getNovelsData(data, "rising_action");
      setNovelsRising(rising);

      const climax = getNovelsData(data, "climax");
      setNovelsClimax(climax);

      const falling = getNovelsData(data, "falling_action");
      setNovelsFalling(falling);

      setNovels(beginning);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

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

  const handleNovels = (stage: number) => {
    setNovelsType(stage);
    switch (stage) {
      case 0:
        setNovels(novelsBegging);
        break;
      case 1:
        setNovels(novelsRising);
        break;
      case 2:
        setNovels(novelsClimax);
        break;
      case 3:
        setNovels(novelsFalling);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <article
        className={`w-full mx-auto my-32 mr-16 horizontal-tb transition-all opacity-0 animate-text-animation-op animation-delay-1 ${
          isReading ? "blur-sm" : ""
        }`}
      >
        <div className="max-w-[1000px] m-auto w-full">
          <div className="flex justify-end items-center gap-3 mb-4">
            <h3 className="text-3xl pb-2 mr-4">共著：{user?.name}</h3>
            <h3 className="text-3xl">
              <button
                className={`pb-2 border-b-4 transition-all ${
                  novelsType === 0 ? "border-green-300" : null
                }`}
                onClick={() => handleNovels(0)}
              >
                起
              </button>
            </h3>
            <h3 className="text-3xl">
              <button
                className={`pb-2 border-b-4 transition-all ${
                  novelsType === 1 ? "border-green-300" : null
                }`}
                onClick={() => handleNovels(1)}
              >
                承
              </button>
            </h3>
            <h3 className="text-3xl">
              <button
                className={`pb-2 border-b-4 transition-all ${
                  novelsType === 2 ? "border-green-300" : null
                }`}
                onClick={() => handleNovels(2)}
              >
                転
              </button>
            </h3>
            <h3 className="text-3xl">
              <button
                className={`pb-2 border-b-4 transition-all ${
                  novelsType === 3 ? "border-green-300" : null
                }`}
                onClick={() => handleNovels(3)}
              >
                結
              </button>
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-y-7 gap-x-8">
            {novels.map((novel) => (
              <Ssnovel key={novel.id} novel={novel} handleClick={handleClick} />
            ))}
          </div>
        </div>
      </article>
      {isReading && <Reading id={readingId} />}
    </>
  );
};

export default UserIndex;
