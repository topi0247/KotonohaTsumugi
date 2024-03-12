import { useRouter } from "next/router";
import { useAuth } from "@/providers/auth";
import { Button } from "@mui/material";
import { useEffect } from "react";

const LogoutPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) return;
    router.push("/login");
  }, []);

  const handleClickLogout = () => {
    logout();
    router.push("/login");
  };

  const handleClickWrite = () => {
    router.push("/write");
  }

  const handleClickRead = () => {
    router.push("/read");
  }

  return (
    <article className="absolute right-0 h-full w-screen mx-auto flex justify-center items-center pb-32 horizontal-tb">
      <div>
        <h2 className="text-2xl m-4 text-center">またにする？</h2>
        <section className="bg-white p-5 w-[400px] m-auto flex gap-3 justify-center item-center">
          <Button variant="outlined" type="button" onClick={handleClickLogout}>ばいばい</Button>
          <Button variant="outlined" type="button" onClick={handleClickWrite}>まだ紡ぐ</Button>
          <Button variant="outlined" type="button" onClick={handleClickRead}>もっと読む</Button>
        </section>
      </div>
    </article>
  );
};

export default LogoutPage;
