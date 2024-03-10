import { useRouter } from "next/router";
import { useAuth } from "@/providers/auth";
import { Button } from "@mui/material";
import { useEffect } from "react";

const LogoutPage = () => {
  const { isLogin, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) return;
    router.push("/login");
  }, []);

  const handleClick = () => {
    logout();
    router.push("/login");
  };

  return (
    <article className="h-full w-full flex justify-center items-center pb-32 horizontal-tb">
      <div>
        <h2 className="text-2xl m-4 text-center">またにする？</h2>
        <section className="bg-white p-5 w-[400px] m-auto flex gap-3 justify-center item-center">
          <Button variant="outlined" type="button" onClick={handleClick}>ばいばい</Button>
          <Button variant="outlined" type="button" href="/write">まだ綴る</Button>
          <Button variant="outlined" type="button" href="/read">もっと読む</Button>
        </section>
      </div>
    </article>
  );
};

export default LogoutPage;
