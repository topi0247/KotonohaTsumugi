import Style from "./index.module.css";
import { SSNovel } from "@/types/typs";
import { memo } from "react";

const bgcolor = ["bg-white", "bg-blue-100", "bg-green-100", "bg-purple-100"];

const Ssnovel = memo(
  ({
    novel,
    handleClick,
  }: {
    novel: SSNovel;
    handleClick: (id: number) => void;
  }) => {
    return (
      <section
        className="relative w-[500px] aspect-video vertical-rl cursor-pointer"
        onClick={() => handleClick(novel.id)}
      >
        {novel.ssnovel_bodies[3] && (
          <div
            className={`absolute top-0 right-0  w-full h-full page4 transition-all shadow-lg
                  ${bgcolor[3]}`}
          />
        )}
        {novel.ssnovel_bodies[2] && (
          <div
            className={`bg-green-100 absolute top-0 right-0  w-full h-full page3 transition-all shadow-lg
                  ${bgcolor[2]}`}
          />
        )}
        {novel.ssnovel_bodies[1] && (
          <div
            className={`bg-blue-100 absolute top-0 right-0 w-full h-full transition-all shadow-md page2
                ${bgcolor[1]}`}
          />
        )}
        <div
          className={`bg-white absolute top-0 right-0 h-full w-hull flex flex-col gap-3 justify-start p-4 w-full shadow-sm hover:rotate-[3deg] transition-all page1 pb-8
                ${bgcolor[0]}`}
        >
          <h3 className="text-2xl text-start">{novel.title}</h3>
          <div className="text-end pb-3">
            <p className="text-xl">{novel.ssnovel_bodies[0].user.name}</p>
          </div>
          <p
            className={`text-clip overflow-hidden gradient-text whitespace-pre-wrap ${Style.gradientText}`}
          >
            {novel.ssnovel_bodies[0].content}
          </p>
          <div className="horizontal-tb absolute bottom-0 left-0 flex gap-2 text-sm justify-start items-end text-start p-2 text-gray-400">
            <p>作成日 {novel.created_at}</p>
            <p>更新日 {novel.updated_at}</p>
          </div>
        </div>
      </section>
    );
  }
);
Ssnovel.displayName = "Ssnovel";
export default Ssnovel;
