import { Link } from "react-router";

const Tools = () => {
  return (
    <div className="h-full flex justify-center mt-10 overflow-y-scroll no-scrollbar">
      <div className="">
        <section className="flex flex-col gap-8 items-center justify-center">
          <div>
            <h2 className="text-5xl text-purple-600">Tool List</h2>
          </div>
          <div className="flex gap-6 justify-center ">
            <Link
              to={"/tools/image-compressor"}
              className="bg-purple-600 hover:bg-teal-600 transition-colors duration-300 text-white px-6 py-2 rounded-md text-2xl font-semibold "
            >
              Image Compressor
            </Link>
            <Link
              to={"/tools/image-converter"}
              className="bg-purple-600 hover:bg-teal-600 transition-colors duration-300 text-white px-6 py-2 rounded-md text-2xl font-semibold"
            >
              Image Converter
            </Link>
            <Link
              to={"/tools/image"}
              className="bg-purple-600 hover:bg-teal-600 transition-colors duration-300 text-white px-6 py-2 rounded-md text-2xl font-semibold"
            >
              Pdf resizer
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools;
