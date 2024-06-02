import { FadeLoader } from "react-spinners";

function Loader() {
  return (
    <div className="absolute inset-0 z-[1] flex items-center justify-center bg-gray-900 bg-opacity-55 backdrop-blur-sm  ">
      <FadeLoader color="#ff0000" height={50} margin={30} />
    </div>
  );
}

export default Loader;
