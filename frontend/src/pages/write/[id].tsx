import { useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/router";
import { NarrativeType, SSNovel, User } from "@/types/typs";
import { Button } from "@mui/material";
import { Page } from "./_page";

const WriteContinue = () => {
  const { id } = useRouter().query;
  const { currentUser } = useAuth();
  const [user, setUser] = useState({} as User);
  const [text, setText] = useState("");
  const [textCount, setTextCount] = useState(0);
  const [ssnovel, setSSNovel] = useState({} as SSNovel);
  const [narrativeStage, setNarrativeStage] = useState("beginning" as string);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    if (id) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovels/${id}`, {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSSNovel(data);
          const lastBody = data.ssnovel_bodies[data.ssnovel_bodies.length - 1];
          const nextStage = getNextNarrativeStage(lastBody.narrative_stage);
          if (nextStage === "") router.push("/read");
          setNarrativeStage(nextStage);
          setLoading(false);
        });
      return;
    }
    // TODO : ページが存在しないとき用の処理
    //router.push("/read");
  }, []);

  useEffect(() => {
    currentUser().then((data) => {
      if (data) {
        setUser(data);
      } else {
        router.push("/login");
      }
    });

    fetchData();
  }, [fetchData]);

  const getNextNarrativeStage = (stage: string) => {
    switch (stage) {
      case "beginning":
        return "rising_action";
      case "rising_action":
        return "climax";
      case "climax":
        return "falling_action";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(e.target.value);
    setTextCount(text.length);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (text === "") {
      alert("文字を入力してください");
      return;
    }

    const body = {
      ssnovel_id: id,
      content: text,
      narrative_stage: getNarrativeIndex(),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ssnovel_bodies`,
      {
        method: "POST",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ssnovel_body: body }),
      }
    );

    if (response.status === 201) {
      router.push("/read");
    } else {
      alert("投稿に失敗しました");
    }
  };

  const getNarrativeIndex = () => {
    const keys = Object.keys(NarrativeType);
    return keys.indexOf(narrativeStage);
  };

  const getBgColor = (index = getNarrativeIndex()) => {
    switch (index) {
      case 0:
        return "bg-white";
      case 1:
        return "bg-blue-100";
      case 2:
        return "bg-green-100";
      default:
        return "bg-white";
    }
  };

  const getRotate = (index: number) => {
    switch (index) {
      case 0:
        return 6;
      case 1:
        return 2;
      case 2:
        return -2;
      default:
        return 0;
    }
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      <article className="mr-32 w-full grid grid-cols-5 overflow-hidden relative">
        <section className="col-span-4 w-full m-auto flex flex-col py-10 relative">
          <div className="max-w-[1200px] ml-auto">
            <div className="text-4xl m-auto flex justify-between items-center h-full">
              <h2 className="p-3 focus:outline-none h-full max-h-[700px]">
                {ssnovel.title}
              </h2>
            </div>
            <div className="flex m-4 text-bold justify-between items-center">
              <h3 className="text-3xl">
                {NarrativeType[narrativeStage as keyof typeof NarrativeType]}
              </h3>
              <h3 className="text-end text-2xl">{user?.name}</h3>
            </div>
            <div className={`w-[1000px] h-[630px] m-auto p-5 ${getBgColor()}`}>
              <textarea
                className={`resize-none leading-[calc(24px+25px)] h-full focus:outline-none text-2xl tracking-widest px-3 overflow-hidden w-full break-all ${getBgColor()}`}
                onChange={handleChange}
                value={text}
                placeholder="・・・・・・"
              />
            </div>
          </div>
          <div>
            {ssnovel.ssnovel_bodies.map((ssnovelBody, index) => {
              return (
                <Page
                  key={index}
                  ssnovelBody={ssnovelBody}
                  bgColor={getBgColor(index)}
                  rotate={getRotate(index)}
                  style={{
                    right: `${1160 + index * 50}px`,
                  }}
                />
              );
            })}
          </div>
        </section>
        <div className="col-span-1 w-full mx-auto mt-10 horizontal-tb flex justify-center items-center gap-3">
          <Button variant="outlined" type="button">
            読み返す
          </Button>
          <Button variant="outlined" type="button" onClick={handleClick}>
            続きを紡いだ
          </Button>
          <p>文字数：{textCount} / 400</p>
        </div>
      </article>
    </>
  );
};

export default WriteContinue;
