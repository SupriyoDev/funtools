import { Outlet } from "react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div className=" max-w-full mx-auto h-[200vh] bg-gray-950 text-white ">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
