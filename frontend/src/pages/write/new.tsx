import { useAuth } from "@/providers/auth";

const WriteNew = () => {
  const { user } = useAuth();
  return (
    <article className="vertical-rl ">
      <div className="relative w-full ml-auto vertical-rl flex flex-col py-10">
        <div className="text-4xl mx-2 flex justify-between items-center">
          <h2>タイトル</h2>
          <h3 className="m-4 text-2xl text-bold">{user?.name}</h3>
        </div>
      </div>
    </article>
  );
};

export default WriteNew;
