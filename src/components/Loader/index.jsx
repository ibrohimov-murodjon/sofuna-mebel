import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center bg-gray-900 bg-opacity-55 backdrop-blur-sm  ">
      <FadeLoader
        color="#4283cc"
        speedMultiplier={1.1}
        height={40}
        margin={20}
      />
    </div>
  );
}

export default Loader;
