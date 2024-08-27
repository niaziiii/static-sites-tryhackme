const circles = ["bg-[#ff4444]", "bg-[#b2e028]", "bg-[#ff9c07]"];
export default function index() {
  return (
    <>
      <div className="flex overflow-x-auto whitespace-nowrap bg-[#3e4552] p-2">
        <div className="absolute p-2 px-3 flex items-center space-x-2">
          {circles.map((circle, i) => (
            <div
              key={`circle-${i}`}
              className={`w-3 h-3 ${circle} rounded-full`}
            ></div>
          ))}
        </div>

        <div className="w-full text-lg text-center flex items-center justify-center terminal">
          Terminal
        </div>
      </div>
    </>
  );
}
