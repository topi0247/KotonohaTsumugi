import { SSNovelBody } from "@/types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { memo, useCallback, useEffect, useState } from "react";

// TODO : この関数は共通化できる
const NarrativeStageConvert: { [key: string]: string } = {
  beginning: "起",
  rising_action: "承",
  climax: "転",
  falling_action: "結",
};

const ReadPage = memo(
  ({
    ssnovelBody,
    bgColor,
    rotate,
    isReading,
    toggleRead,
    style,
  }: {
    ssnovelBody: SSNovelBody;
    rotate: Number;
    bgColor: String;
    isReading: Boolean;
    toggleRead: Function;
    style?: React.CSSProperties;
  }) => {
    const [movePage, setMovePage] = useState(0);
    const [rotatePage, setRotatePage] = useState(rotate);
    const [readPage, setReadPage] = useState(false);

    const handleBack = useCallback(() => {
      setMovePage(0);
      setReadPage(false);
      setRotatePage(rotate);
    }, [rotate]);

    useEffect(() => {
      if (isReading) return;
      handleBack();
    }, [isReading, handleBack]);

    const handleClick = () => {
      if (!isReading) {
        toggleRead();
      }
      setMovePage(100);
      setReadPage(true);
      setRotatePage(0);
    };

    if (!ssnovelBody) return null;

    return (
      <>
        <section
          className={`absolute  h-[630px] shadow-md hover:translate-x-10 transition-all p-4 ${bgColor}`}
          style={{
            ...style,
            transform: `translateX(${movePage}%) rotate(${rotatePage}deg)`,
          }}
        >
          <div
            className="flex justify-between p-2 cursor-pointer "
            onClick={handleClick}
          >
            <h2 className="text-2xl">
              {NarrativeStageConvert[ssnovelBody.narrative_stage]}
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
ReadPage.displayName = "ReadPage";
export default memo(ReadPage);
