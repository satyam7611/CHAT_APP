import useGetMessage from "../../context/useGetMessage.jsx";
import Loading from "../../components/Loading.jsx";
import Message from "./Message";
const Messages = () => {
  const { messages, loading } = useGetMessage();
  // console.log("message from backend",messages);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
      <div className="flex-1 overflow-y-auto p-2">
        {!loading && messages.length === 0 && (
          <div>
            <p className="text-center mt-[20%] text-2xl">say hi</p>
          </div>
        )}
      </div>
    </>
  );
};
export default Messages;
