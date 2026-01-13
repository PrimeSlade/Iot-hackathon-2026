import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
