
import Search from "./Search.jsx";
import User from "./User.jsx";
const Left = () => {
  return (
    <div className="w-[30%] text-white bg-black">

      <div>
        <h1 className="font-bold text-3xl p-2 mb-3 mx-1.5">Chats</h1>
      </div>
      <div>
        <Search />
      </div>

      <hr />
      <User />
    </div>

  );
};

export default Left;
