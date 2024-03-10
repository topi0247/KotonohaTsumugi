import Link from "next/link";
import style from "./_headers.module.css";

export const _Headers = () => {
  return (
    <div>
      <h1 className="text-3xl mt-32 mx-12">ことのはつむぎ</h1>
      <nav className="fixed right-[-35px] h-full flex justify-center items-center mt-32">
        <ul className="flex flex-col horizontal-tb text-xl tracking-[20px] gap-4">
          <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
            <Link href="/read" className={style.tag}>
              書庫
            </Link>
          </li>
          <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
            <Link href="/write/new" className={style.tag}>
              執筆
            </Link>
          </li>
          <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
            <Link href="/user" className={style.tag}>
              私室
            </Link>
          </li>
          <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
            <Link href="/login" className={style.tag}>
              入室
            </Link>
          </li>
          <li className="transition-transform duration-50 ease-in-out hover:translate-x-[-50px] hover:translate-y-[10px]">
            <Link href="/logout" className={style.tag}>
              退出
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
