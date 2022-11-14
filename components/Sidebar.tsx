import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
// import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
// import { ImCancelCircle } from "react-icons/im";
import { MdOutlineCancel, MdOutlineMenu, MdOutlineHome } from "react-icons/md";

import SuggestedAccounts from "./SuggestedAccounts";
import Discover from "./Discover";
import Footer from "./Footer";
import useAuthStore from "../store/authStore";

const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);

  // const { fetchAllUsers, allUsers }: any = useAuthStore();


  return (
    <div>
      <div
        className="flex xl:hidden m-2 mt-3 text-xl justify-center "
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? (
          <MdOutlineCancel className="text-lightGray hover:text-colorTwo cursor-pointer" />
        ) : (
          <MdOutlineMenu className="text-lightGray hover:text-colorOne text-3xl cursor-pointer" />
        )}
      </div>
      {showSidebar && (
        <div className="xl:w-300 w-20 flex flex-col justify-start mb-10 border-r border-primaryTwo xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-primaryThree xl:pb-2">
            <Link href="/">
              <div className="group xl:shadow-forYou xl:rounded-xl xl:hover:shadow-sidebarHover flex items-center gap-4 p-2 justify-center xl:justify-start cursor-pointer font-semibold text-lightGray">
                <p className="text-3xl">
                  <MdOutlineHome
                    className="group-hover:text-colorOne" 
                  />
                </p>
                <span className="capitalize text-md font-semibold hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts
          // fetchAllUsers={fetchAllUsers}
          // allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
