import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"

import useAuthStore from "../store/authStore";

import { IUser } from "../types";

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile, allUsers }: any = useAuthStore();

  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex justify-between">
      <div className="mt-4 flex flex-col gap-1 justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-colorOne rounded-full p-2  text-red-500 animate-beat "
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        ) : (
          <div className="bg-colorOne rounded-full p-2  " onClick={handleLike}>
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        )}
        <p className="text-md text-lightGray font-semibold ">
          {likes?.length || 0}
        </p>
      </div>
      <div
        id="lastUsers"
        className="hidden w-2/3 lg:flex items-center justify-end gap-2  "
      >
        <div id="left" className="flex gap-2">
          {allUsers
            .slice()
            .reverse()
            .slice(0, 4)
            .map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                transition={{ ease: "easeOut", delay: idx * 0.3, duration: 0.75 }} 
                whileInView={{ opacity: 1, y: 0}} 
                viewport={{ once: true }} 
                className="w-10 h-10">
                  <Image
                    src={user.image}
                    width={34}
                    height={34}
                    className="rounded-full"
                    alt="user profile"
                    layout="responsive"
                  />
                </motion.div>
              </Link>
            ))}
        </div>
        <div id="right" className="text-lightGray">
          <p>and others liked this post.</p>
        </div>
      </div>
    </div>
  );
};

export default LikeButton;
