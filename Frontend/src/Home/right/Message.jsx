const Message = () => {
  return (
    <>
      <div className="p-2 ">
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-info border rounded-1xl">Calm down, Anakin.</div>
        </div>
      </div>
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-accent">
          That's never been done in the history of the Jedi.
        </div>
      </div>
    </>
  );
};
export default Message;