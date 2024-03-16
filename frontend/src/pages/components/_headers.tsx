import Link from "next/link";
import style from "./_headers.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRead } from "@/providers/reading";

export const _Headers = () => {
  const { isLoggedIn } = useAuth();
  const [login, setLogin] = useState(false);
  const { isReading } = useRead();

  useEffect(() => {
    setLogin(isLoggedIn);
  }, []);

  useEffect(() => {
    setLogin(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="w-32 z-10 fixed">
      <div>
        <h1 className={`text-3xl mt-32 mx-12 ${isReading ? "blur-sm" : ""}`}>
          言の葉つむぎ
        </h1>
        <nav
          className={`fixed right-[-35px] h-full flex justify-center items-center mt-32 ${
            isReading ? "blur-sm" : ""
          }`}
        >
          <ul className="flex flex-col horizontal-tb text-xl tracking-[20px] gap-4">
            <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
              <Link href="/read" className={style.tag}>
                書庫
              </Link>
            </li>
            {login ? (
              <>
                <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
                  <Link href="/write" className={style.tag}>
                    執筆
                  </Link>
                </li>
                <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
                  <Link href="/user" className={style.tag}>
                    私室
                  </Link>
                </li>
                <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
                  <Link href="/logout" className={`${style.tag}`}>
                    退出
                  </Link>
                </li>
              </>
            ) : (
              <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
                <Link href="/login" className={style.tag}>
                  入室
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
