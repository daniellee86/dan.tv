import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { BsBell } from "react-icons/bs";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import { createOrGetUser } from "../utils/index";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-primaryThree py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] flex justify-start cursor-pointer">
          <h1 className="font-bold text-lightGray text-2xl underline decoration-wavy decoration-colorOne underline-offset-8 decoration-2">
            DAN.tv
          </h1>
        </div>
      </Link>

      <div className="relative hidden lg:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-primaryOne"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primaryThree py-2 px-6 md:text-md font-medium border border-primaryThree focus:outline-none text-lightGray placeholder-lightGray focus:border-lightGray w-[300px] xl:w-[400px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-2 xl:border-l-2 border-lightGray pl-4 text-2xl text-colorOne"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10 items-center">
            <Link href="/upload">
              <button className="bg-primaryThree p-2 md:px-4 text-md text-lightGray font-semibold flex items-center gap-2 rounded-full">
                <IoMdAdd className="text-xl text-colorOne" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div className="flex items-center border-2 border-lightGray rounded-full">
                  <Image
                    className="rounded-full cursor-pointer "
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <BsBell
              className="text-lightGray hidden sm:block transition duration-500 ease-in-out  hover:scale-110 cursor-pointer"
              fontSize={21}
            />
            <AiOutlineMessage
              className="text-lightGray hidden sm:block transition duration-500 ease-in-out  hover:scale-110  cursor-pointer"
              fontSize={21}
            />
            <button
              type="button"
              className=" px-2 cursor-pointer transition duration-500 ease-in-out  hover:scale-110"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout className="text-colorTwo" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Login Failed")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
