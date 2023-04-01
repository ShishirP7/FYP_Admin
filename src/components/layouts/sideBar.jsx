import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  kycIcon,
  renewalIcons,
  memberRegistrationIcon,
  formRenewal,
  changePasswordIcon,
  examIcon,
} from "../icons/icons";

export const sidebarItems = [
  { name: "Dashboard", icon: kycIcon, link: "/" },
  {
    name: "Employers",
    icon: renewalIcons,
    link: "/employers",
  },
  {
    name: "Job Postings",
    icon: examIcon,
    link: "/jobs",
  },
  {
    name: "Update Category",
    icon: examIcon,
    link: "/category",
  },
  {
    name: "Settings",
    icon: memberRegistrationIcon,
    link: "/change-password",
  },
];
export default function Sidebar({ minimize, setMinimize }) {
  const [path, setPath] = useState("/admin/");
  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <div
      className={` fixed hidden md:hidden lg:block overflow-y-auto left-0 hidden lg:block ${
        minimize ? "md:w-24" : "md:w-64"
      }  h-screen transition-all duration-300 border-none z-10 sidebar`}
    >
      {/* Hamburger */}
      <div className={` absolute top-6 ${minimize ? "right-7" : "right-3"}`}>
        <button
          onClick={() => (minimize ? setMinimize(false) : setMinimize(true))}
          className="flex items-start ml-2 px-3 py-2 border rounded text-teal-600 border-teal-300 hover:text-[#ffffff] hover:bg-[#00C0A3]"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {/* Hamburger */}
      <div className="flex flex-col h-full  justify-start pt-20">
        {/* Image Section */}
        {/* <aside className="px-6"> */}
        <aside className="p-6">
          <h1 className="text-2xl text-gray-600 font-semibold text-center">
            {!minimize ? <>JOBJUNCTION</> : <>Job </>}
          </h1>
          <hr className="py-5 mt-4 text-black" />
          <ul className="space-y-2  ">
            {sidebarItems.map((item, index) => {
              return (
                <li key={index} className="text-gray-500 hover:text-gray-500">
                  <Link
                    to={`/admin${item.link}`}
                    className={`flex items-center p-2 font-normal hover:text-white rounded-lg  hover:bg-[#00C0A3] 
                    } `}
                  >
                    {item.icon}
                    {minimize ? (
                      <></>
                    ) : (
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        {" "}
                        {item.name}{" "}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
        {!minimize && (
          <div
            className={` flex items-center justify-center p-2 pt-7 text-center text-white font-normal  rounded   cursor `}
            onClick={() => {}}
          ></div>
        )}
      </div>
    </div>
  );
}

export const CustomListItem = ({ label, link, path, icon }) => {
  return (
    <div to={`/${link}`} selected={path === link}>
      <div>
        <div>{icon}</div>
      </div>
      <div sx={{ fontSize: "16px", fontWeight: "400", color: "white" }}>
        {label}
      </div>
    </div>
  );
};
