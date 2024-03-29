import Style from "./headers.module.css";
import React, { memo, useEffect, useRef, useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRead } from "@/providers/reading";
import { useRouter } from "next/router";

const TagButton = memo(
  ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    return (
      <span className={Style.tag} onClick={onClick}>
        {children}
      </span>
    );
  }
);
TagButton.displayName = "TagButton";

const Headers = memo(() => {
  const { isLoggedIn } = useAuth();
  const [login, setLogin] = useState(false);
  const { isReading } = useRead();
  const [path, setPath] = useState("");
  const router = useRouter();
  const isClickRef = useRef(false);

  useEffect(() => {
    setLogin(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const newPath = url.pathname;
    isClickRef.current = newPath === "/" ? false : true;
    setPath(newPath);
  }, [router]);

  return (
    <header
      className={`z-10 fixed duration-1000 transform ${
        isClickRef.current ? "translate-x-8 w-32" : "-translate-x-1/2 w-full"
      }`}
    >
      <div>
        <h1
          className={`text-4xl mt-16 transition-all ${
            isClickRef.current ? "pr-16" : ""
          } ${isReading ? "blur-sm" : ""} `}
        >
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-1 mb-3">
            言
          </span>
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-2 mb-3">
            の
          </span>
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-3 mb-3">
            葉
          </span>
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-4 mb-3">
            つ
          </span>
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-5 mb-3">
            む
          </span>
          <span className="inline-block tracking-tighter opacity-0 animate-text-animation transform translate-y-[-1rem] animation-delay-6">
            ぎ
          </span>
        </h1>
        <nav
          className={`absolute top-[110%] flex justify-center items-center transition-all ${
            isClickRef.current ? "right-0" : "-right-10"
          } ${isReading ? "blur-sm" : ""}`}
        >
          <ul className="flex flex-col horizontal-tb text-xl tracking-[20px] gap-4">
            <li
              className={`opacity-0 animate-text-animation-op animation-delay-7 transition-all ${
                isClickRef.current
                  ? `hover:-translate-x-6 hover:translate-y-1 -rotate-6 ${
                      path === "/read" ? "-translate-x-6 translate-y-1" : ""
                    }`
                  : "hover:translate-y-2"
              }`}
            >
              <TagButton onClick={() => router.push("/read")}>書庫</TagButton>
            </li>
            {login ? (
              <>
                <li
                  className={`opacity-0 animate-text-animation-op animation-delay-8 transition-all ${
                    isClickRef.current
                      ? `hover:-translate-x-6 hover:translate-y-1 -rotate-6 ${
                          path === "/write"
                            ? "-translate-x-6 translate-y-1"
                            : ""
                        }`
                      : "hover:translate-y-2"
                  }`}
                >
                  <TagButton onClick={() => router.push("/write")}>
                    執筆
                  </TagButton>
                </li>
                <li
                  className={`opacity-0 animate-text-animation-op animation-delay-8 transition-all ${
                    isClickRef.current
                      ? `hover:-translate-x-6 hover:translate-y-1 -rotate-6 ${
                          path === "/user" ? "-translate-x-6 translate-y-1" : ""
                        }`
                      : "hover:translate-y-2"
                  }`}
                >
                  <TagButton onClick={() => router.push("/user")}>
                    私室
                  </TagButton>
                </li>
                <li
                  className={`opacity-0 animate-text-animation-op animation-delay-9 transition-all ${
                    isClickRef.current
                      ? `hover:-translate-x-6 hover:translate-y-1 -rotate-6 ${
                          path === "/logout"
                            ? "-translate-x-6 translate-y-1"
                            : ""
                        }`
                      : "hover:translate-y-2"
                  }`}
                >
                  <TagButton onClick={() => router.push("/logout")}>
                    退室
                  </TagButton>
                </li>
              </>
            ) : (
              <li
                className={`opacity-0 animate-text-animation-op animation-delay-8 transition-all ${
                  isClickRef.current
                    ? `hover:-translate-x-6 hover:translate-y-1 -rotate-6 ${
                        path === "/login" ? "-translate-x-6 translate-y-1" : ""
                      }`
                    : "hover:translate-y-2"
                }`}
              >
                <TagButton onClick={() => router.push("/login")}>
                  入室
                </TagButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});

Headers.displayName = "Headers";
export default Headers;
