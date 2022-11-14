import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

import { IUser } from "../types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="h-[500px] lg:h-[700px] pt-4 px-10 bg-lightGray border-b-2 lg:pb-0 pb-[100px]">
      <h1 className="text-lg font-bold text-primaryOne mb-2">Comments:</h1>
      <div className="overflow-scroll h-[250px] sm:h-[300px] lg:h-[500px]  scrollbar-thumb-primaryOne scrollbar-thin p-5 mb-10">
        {comments?.length > 0 ? (
          comments.map((item, i) => (
            <div key={i}>
              {allUsers.map(
                (user: IUser, idx) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }} 
                    transition={{ ease: "easeOut", delay: i * 0.3, duration: 0.75 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    viewport={{ once: true }} 
                      className="p-2 mb-5 flex flex-col gap-2 border border-primaryTwo rounded-xl"
                      key={idx}
                    >
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="captalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p className="ml-10">{item.comment}</p>
                      </div>
                    </motion.div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {userProfile && (
        <div id="wrapper" className="flex justify-center">
          <div className="w-[100%]">
            <form
              onSubmit={addComment}
              className="flex flex-col items-center sm:flex-row sm:justify-center  gap-4"
            >
              <input
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add comment..."
                className="bg-primaryTwo py-4 px-6 md:text-md font-medium focus:outline-none text-lightGray placeholder-lightGray  w-[250px] md:w-[700px] lg:w-[350px] rounded-2xl"
              />
              <button
                onClick={addComment}
                className="md:text-md font-semibold border-2 border-primaryTwo px-4 py-3 rounded-2xl"
              >
                {isPostingComment ? "Commenting..." : "Comment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
