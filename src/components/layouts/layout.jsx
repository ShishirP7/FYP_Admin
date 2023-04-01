import React, { useState } from "react";
import Dropdown from "../dropDown/dropdown";
import { menuIcon } from "../icons/icons";
import Sidebar, { sidebarItems } from "./sideBar";

export default function DashboardLayout({ children, title }) {
  const [minimize, setMinimize] = useState(false);
  return (
    <>
      <HamburgerMenu />
      <div className="min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased bg-white ">
        <Sidebar minimize={minimize} setMinimize={setMinimize} />
        <main
          className={` bg-slate-50   h-full pt-4 lg:pt-0 lg:mt-0 ${
            minimize ? "lg:ml-24 minimized" : "lg:ml-64"
          } transition-all duration-300`}
        >
          <div className="h-full  p-4  ">
            <div className="flex   justify-end gap-5 items-center px-2 relative bg-white shadow-md rounded-md py-2">
              <Dropdown />
            </div>
          </div>
          <div className="p-5">{children}</div>
        </main>
      </div>
    </>
  );
}

export const HamburgerMenu = () => {
  const [itemOpen, setitemOpen] = useState(false);
  return (
    <>
      <nav
        className={`flex flex-wrap flex-col items-start gap-6 ${
          itemOpen
            ? "bg-gradient-to-b h-full from-indigo-600 to-red-400"
            : "bg-gradient-to-r from-indigo-600 to-red-500"
        } p-6 w-full fixed lg:hidden z-40`}
      >
        <div className="block lg:hidden">
          <button
            onClick={() => (itemOpen ? setitemOpen(false) : setitemOpen(true))}
            className="flex items-start ml-2 px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            {menuIcon}
          </button>
        </div>
        {itemOpen ? (
          <aside className="w-full">
            <ul className="space-y-2 w-full">
              {sidebarItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="text-white hover:text-gray-500 w-full"
                  >
                    <div>
                      {item.icon}
                      <span className="flex-1 hover:block lg:block ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
};
