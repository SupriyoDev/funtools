import { Link } from "react-router";

const Header = () => {
  return (
    <div className=" h-20 sticky top-0 z-50 flex w-full border-b border-white/15 bg-white/[1%] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between   w-full">
        <div className="">
          <Link to={"/"} className="text-4xl font-bold text-teal-100">
            Supriyo<span className="text-purple-600">.fun</span>
          </Link>
        </div>
        <div className="flex gap-6 items-center justify-center text-lg font-medium">
          <Link to={"/"} className="">
            Home
          </Link>
          <Link to={"/tools"}>Tools</Link>
          <Link to={"/about"}>About Me</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
