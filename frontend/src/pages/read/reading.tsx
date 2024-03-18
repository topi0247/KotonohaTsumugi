import { useRead } from "@/providers/reading";
import { SSNovel, SSNovelBody } from "@/types/typs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Page } from "./page";

export const Reading = ({ id }: { id: number }) => {
  const [novel, setNovel] = useState({} as SSNovel);
  const [ssnovelBodies, setSSNovelBodies] = useState([] as SSNovelBody[]);
  const [loading, setLoading] = useState(true);
  const { setIsReading } = useRead();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovels/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      const data = await response.json();
      setNovel(data);
      setSSNovelBodies(data.ssnovel_bodies);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (ssnovelBodies.length > 0) setLoading(false);
  }, [ssnovelBodies]);

  const handleWriteClick = () => {
    setIsReading(false);
    router.push(`/write/${id}`);
  };

  const handleBackClick = () => {
    setIsReading(false);
  };

  const getBgColor = (index: number) => {
    const bgcolor = [
      "bg-white",
      "bg-green-100",
      "bg-blue-100",
      "bg-yellow-100",
    ];
    return bgcolor[index];
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <article className="horizontal-tb fixed w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-40">
          <section className="max-w-[1200px] w-full aspect-video m-auto">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-full h-full"
              initialSlide={3}
            >
              <SwiperSlide className="flex justify-center items-center bg-white vertical-rl">
                Slide 1
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center bg-white vertical-rl">
                Slide 2
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center bg-white vertical-rl">
                Slide 3
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center bg-white vertical-rl">
                <Page ssnovelBody={ssnovelBodies[0]} title={novel.title} />
              </SwiperSlide>
            </Swiper>
            <div className="w-full m-auto flex justify-between items-center gap-32 px-10">
              {ssnovelBodies.length < 5 && (
                <button
                  className="border border-transparent hover:border-green-800 hover:border-opacity-50 hover:bg-green-300 hover:bg-opacity-10 transition-all horizontal-tb w-full p-4 my-4 text-white flex justify-center items-center gap-10"
                  onClick={handleWriteClick}
                >
                  <span>続</span>
                  <span>き</span>
                  <span>を</span>
                  <span>紡</span>
                  <span>ぐ</span>
                </button>
              )}
              <button
                className="border border-transparent hover:border-slate-800 hover:border-opacity-20 hover:bg-slate-500 hover:bg-opacity-10 transition-all horizontal-tb w-full p-4 my-4 text-white flex justify-center items-center gap-32"
                onClick={handleBackClick}
              >
                <span>戻</span>
                <span>す</span>
              </button>
            </div>
          </section>
        </article>
      )}
    </>
  );
};
