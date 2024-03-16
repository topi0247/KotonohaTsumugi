import { NarrativeType, SSNovelBody } from "@/types/typs";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { memo, use, useEffect, useState } from "react";

export const Page = memo(
  ({
    ssnovelBody,
    bgColor,
    rotate,
    style,
  }: {
    ssnovelBody: SSNovelBody;
    rotate: Number;
    bgColor: String;
    style?: React.CSSProperties;
  }) => {
    const [movePage, setMovePage] = useState(0);
    const [initialRotate, setInitialRotate] = useState(rotate);
    const [rotatePage, setRotatePage] = useState(initialRotate);
    const [readPage, setReadPage] = useState(false);

    const handleClick = () => {
      setMovePage(1000);
      setReadPage(true);
      setRotatePage(0);
    };

    const handleBack = () => {
      setMovePage(0);
      setReadPage(false);
      setRotatePage(initialRotate);
    };

    return (
      <>
        <section
          className={`absolute w-[780px] h-[630px] shadow-md hover:translate-x-10 transition-all p-4 ${bgColor}`}
          style={{
            ...style,
            transform: `translateX(${movePage}px) rotate(${rotatePage}deg)`,
          }}
        >
          <div
            className="flex justify-between p-2 cursor-pointer "
            onClick={handleClick}
          >
            <h2 className="text-2xl">
              {
                NarrativeType[
                  ssnovelBody.narrative_stage as keyof typeof NarrativeType
                ]
              }
            </h2>
            <h4 className="text-xl pb-8">{ssnovelBody.user.name}</h4>
          </div>
          <div>
            <p className="whitespace-pre-wrap tracking-[0.25em] leading-10 text-xl mt-4">
              {ssnovelBody.content}
            </p>
          </div>
          <div
            className={`absolute bottom-[-80px] left-4  ${
              readPage ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              className={`border hover:border-slate-300 hover:${bgColor} bg-opacity-20 hover:bg-opacity-70 transition-all w-full p-2 my-2 text-gray-600 flex flex-col justify-between items-center tracking-[32px] gap-2 ${bgColor} text-slate-500`}
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon />
            </button>
          </div>
        </section>
      </>
    );
  }
);
