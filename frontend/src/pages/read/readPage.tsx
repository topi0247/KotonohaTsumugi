import { SSNovelBody } from "@/types";
import { memo } from "react";

const NarrativeStageConvert: { [key: string]: string } = {
  beginning: "起",
  rising_action: "承",
  climax: "転",
  falling_action: "結",
};

const ReadPage = memo(
  ({
    ssnovelBody,
    title = "",
  }: {
    ssnovelBody: SSNovelBody;
    title?: string;
  }) => {
    if (!ssnovelBody) return null;
    return (
      <div className=" w-full aspect-video p-8 pt-4 flex flex-col justify-start relative m-auto">
        {ssnovelBody.narrative_stage === "beginning" && (
          <h2 className="text-4xl">{title}</h2>
        )}
        <p className="text-end text-2xl">{ssnovelBody.user.name}</p>
        <h3 className="mt-10 text-3xl text-gray-500">
          {NarrativeStageConvert[ssnovelBody.narrative_stage]}
        </h3>
        <p className="mx-6 tracking-[0.25em] leading-10 text-2xl mt-4 whitespace-pre-wrap">
          {ssnovelBody.content}
        </p>
        <div className="horizontal-tb absolute bottom-0 left-0 flex gap-2 text-sm justify-start items-end text-start p-2 text-gray-400">
          <p>作成日 {ssnovelBody.created_at}</p>
        </div>
      </div>
    );
  }
);
ReadPage.displayName = "ReadPage";
export default ReadPage;
