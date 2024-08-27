const WindowMenuBar = () => {
  const tasks = [
    {
      content: (
        <span className="flex gap-2">
          <p className="w-[8rem] rounded py-1 bg-gray"></p>
        </span>
      ),
    },
    {
      content: (
        <span className="flex gap-2">
          <p className="w-[8rem] rounded py-1 bg-gray"></p>
          <p className="w-[4rem] rounded py-1 bg-gray"></p>
        </span>
      ),
    },
    {
      content: (
        <span className="flex gap-2">
          <p className="w-[6rem] rounded py-1 bg-gray"></p>
        </span>
      ),
    },
    {
      content: (
        <span className="flex gap-2">
          <p className="w-[3rem] rounded py-1 bg-gray"></p>
          <p className="w-[3rem] rounded py-1 bg-gray"></p>
        </span>
      ),
    },
  ];

  return (
    <div className="bg-thm text-white absolute bottom-0 w-full py-4 overflow-hidden">
      <div className="flex items-center justify-center gap-[5rem] ml-5">
        {tasks.map((task, index) => {
          return <div key={`elem-${index}`}>{task.content}</div>;
        })}
      </div>
    </div>
  );
};

export default WindowMenuBar;
