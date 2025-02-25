import "../../styles/loaders.css";

export const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center z-[999999999]">
      <div className="border-4 border-white border-opacity-25 rounded-full w-10 h-10 page-loader"></div>
    </div>
  );
};
