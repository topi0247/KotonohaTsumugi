import { SSNovel, SSNovelBody } from "@/types/typs";
import { useCallback, useEffect, useState } from "react";

export const Reading = ({
  toggleReading,
  id,
}: {
  toggleReading: () => void;
  id: number;
}) => {
  const [novel, setNovel] = useState({} as SSNovel);
  const [ssnovelBodies, setSSNovelBodies] = useState([] as SSNovelBody[]);
  const [loading, setLoading] = useState(true);

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
      console.log(data);
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

  const handleClick = () => {
    toggleReading();
  };

  return (
    <>
      {loading ? (
        <div className="fixed w-full h-full z-10 right-0 top-0 flex justify-center items-center bg-black bg-opacity-30">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      ) : (
        <article
          id="novel_body"
          className="fixed w-full h-full z-10 right-0 top-0 flex justify-center items-center bg-black bg-opacity-30"
        >
          <section className="bg-white max-w-[1100px] w-full aspect-video p-4 pb-8 px-8 flex flex-col justify-start relative">
            <h2 className="text-4xl">{novel.title}</h2>
            <p className="text-end text-2xl">{ssnovelBodies[0].user.name}</p>
            <h3 className="mt-10 text-3xl text-gray-500">起</h3>
            <p className="mx-6 tracking-[0.25em] leading-10 text-2xl mt-4 whitespace-pre-wrap">
              {ssnovelBodies[0].content}
            </p>
            <div className="horizontal-tb absolute bottom-0 left-0 flex gap-2 text-sm justify-start items-end text-start p-2 text-gray-400">
              <p>作成日 {novel.created_at}</p>
              <p>更新日 {novel.updated_at}</p>
            </div>
          </section>
          <div className="w-[1000px] flex justify-center items-center">
            <button
              className="border border-green-400 bg-green-300 bg-opacity-20 hover:bg-opacity-40 transition-all horizontal-tb w-full p-4 my-4 text-white flex justify-center items-center"
              onClick={handleClick}
            >
              <span className="pr-32">戻</span>
              <span className="pl-32">す</span>
            </button>
          </div>
        </article>
      )}
    </>
  );
};
