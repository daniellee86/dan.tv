import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="xl:border-b-2 border-primaryThree pb-4">
      <p className="text-lightGray font-semibold m-3 mt-4 hidden xl:block">
        Suggested Accounts
      </p>

      <div>
        {allUsers
          .slice()
          .reverse()
          .slice(0, 6)
          .map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="flex gap-4 grayscale hover:filter-none p-2 xl:p-3 cursor-pointer font-semibold rounded">
                <div className="w-14 h-14 xl:border-2 xl:border-lightGray rounded-full">
                  <Image
                    src={user.image}
                    width={34}
                    height={34}
                    className="rounded-full "
                    alt="user profile"
                    layout="responsive"
                  />
                </div>
                <div className="hidden xl:block">
                  <p className="flex gap-1 items-center text-md font-bold text-lightGray lowercase">
                    {user.userName.replaceAll(" ", "")}
                    <GoVerified className="text-colorOne" />
                  </p>
                  <p className="captalize text-gray-500 text-xs">
                    {user.userName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
