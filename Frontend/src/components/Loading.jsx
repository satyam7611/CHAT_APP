const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-transparent">
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full bg-slate-800"></div>
        <div className="skeleton h-4 w-28 bg-slate-800"></div>
        <div className="skeleton h-4 w-full bg-slate-800"></div>
        <div className="skeleton h-4 w-full bg-slate-800"></div>
      </div>
    </div>
  );
};

export default Loading;
