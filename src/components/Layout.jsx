import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export const Layout = ({ collapsed, setCollapsed }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar collapsed={collapsed} />
        <div className="flex-1 p-4 overflow-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};