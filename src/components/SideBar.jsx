import { LuSquareUserRound } from "react-icons/lu";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import {
  FaChartBar,
  FaCalendar,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";
import Header from "./Header";
import { IoHomeOutline } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
// import { Routes, Route } from "react-router-dom";
import { NavLink ,Link } from "react-router-dom";
import Product from "./Product";
import Category from "./Category";
import { Route, Routes } from "react-router-dom";
import Categorylist from "./Categorylist";

const SideBar = ({ collapsed }) => {
  return (
    <div className="h-screen flex flex-col">
     
      {/* <Header collapsed={collapsed} setCollapsed={setCollapsed} /> */}

      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on left, below header */}

        <Sidebar collapsed={collapsed} className="h-full bg-gray-100 ">
          <Menu
            rootStyles={{
              [`.${menuClasses.icon}`]: {
                backgroundColor: "#e1e1e1",
                color: "#344cff",
              },
            }}
          >
            {!collapsed && (
              <div className="heading-text text-center my-4 mx-20 ">
                <div className="dot-dot-box  rounded-2xl "> <LuSquareUserRound size={100} color="#39c0a9" /></div>
                <h1 className="text-2xl ">Emily Johnson</h1>
                <span className="text-sm text-gray-600 ">Admin</span>
              </div>
            )}

            
              <MenuItem
                component='div'
                icon={
                  <IoHomeOutline className="hover:text-[#39c0a9] text-gray-900" />
                }
                className="hover:text-[#39c0a9] text-gray-900"
              > <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive ? "text-[#39c0a9]" : "text-gray-900"
              }
            > Dashboard </NavLink>
               </MenuItem>
            
            <NavLink
              to={"/category"}
              className={({ isActive }) =>
                isActive ? "text-[#39c0a9]" : "text-gray-900"
              }
            >
              <SubMenu
                label="Category"
                className="hover:text-[#39c0a9] text-gray-900"
                icon={
                  <MdCategory className="hover:text-[#39c0a9] text-gray-900" />
                }
              >
                <MenuItem
                  icon={
                    <FaList className="hover:text-[#39c0a9] text-gray-900" />
                  }
                  className="hover:text-[#39c0a9] text-gray-900"
                >
                  <Link to={`/category-list`}>Category List</Link>
                  
                </MenuItem>
                <MenuItem
                  icon={
                    <FaPlus className="hover:text-[#39c0a9] text-gray-900" />
                  }
                  className="hover:text-[#39c0a9] text-gray-900"
                >
                  <Link to={`/category-add`}>Add Category</Link>
                </MenuItem>
              </SubMenu>
            </NavLink>
            <NavLink
              to={"/product"}
              className={({ isActive }) =>
                isActive ? "text-[#39c0a9]" : "text-gray-900"
              }
            >
              <SubMenu
                label="Product"
                className="hover:text-[#39c0a9]"
                icon={
                  <FaBoxArchive className="hover:text-[#39c0a9] text-gray-900 " />
                }
              >
                <MenuItem
                  icon={
                    <FaList className="hover:text-[#39c0a9] text-gray-900" />
                  }

                  className="hover:text-[#39c0a9] text-gray-900"
                >
                  
                  <Link to={`/product-list`}>Product List </Link>
                </MenuItem>
                <MenuItem
                  icon={
                    <FaPlus className="hover:text-[#39c0a9] text-gray-900" />
                  }
                  className="hover:text-[#39c0a9] text-gray-900"
                >
                   <Link to={`/product-add`}>Add Product</Link>
                </MenuItem>
              </SubMenu>
            </NavLink>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};

export default SideBar;
