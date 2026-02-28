const Chatuser = () => {
  return (
    <div className="flex space-x-4 pt-3 pb-3 pl-3 sticky top-0 z-10 bg-gray-900 hover:bg-gray-600">
      <div className="avatar avatar-online">
        <div className="w-14 rounded-full">
          {/* <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" /> */}
          <img src="/IMG_20251209_211011.jpg" alt="" />
        </div>
      </div>
      <div>
        <h1 className="font-bold">Satyam</h1>
        <span className="text-sm">Online</span>
      </div>
    </div>
  );
};

export default Chatuser;
