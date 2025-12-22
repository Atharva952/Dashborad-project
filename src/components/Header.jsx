
import { MdOutlineNightlight } from "react-icons/md";
import { LuSquareUserRound } from "react-icons/lu";
import SideBar from "./SideBar";
const Header = ({collapsed, setCollapsed}) => {
  return (
    <>
    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <button
          className="w-6 h-6 flex flex-col justify-between cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="block h-1 bg-black"></span>
          <span className="block h-1 bg-black"></span>
          <span className="block h-1 bg-black"></span>
        </button>

        <div className="flex flex-col leading-tight text-center ml-4">
          <span className="text-2xl font-bold">SH</span>
          <span className="text-xs text-gray-800">STYLE HUB</span>
        </div>
      </div>

      
      <div className="flex items-center space-x-4">
        <div className="icon -rotate-35 " >
            <MdOutlineNightlight size={["25px"]} />
        </div>
        <div className="logo-box">
            <div className="dot-dot-box mx-auto  rounded-sm "><LuSquareUserRound size={27} color="#39c0a9" /></div>
        </div>
      </div>
     
    </div>
     {/* <div className="flex flex-1 overflow-hidden">
      <SideBar collapsed={collapsed}/>
     </div> */}
    </>
  );
};

export default Header;