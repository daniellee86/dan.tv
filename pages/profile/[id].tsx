import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { motion } from "framer-motion";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  console.log(data);
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;

  const videos = showUserVideos
    ? "border-b-2 border-colorOne"
    : "text-gray-600";
  const liked = !showUserVideos
    ? "border-b-2 border-colorOne"
    : "text-gray-600";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 w-full items-center">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase text-lightGray">
            {user.userName.replaceAll(" ", "")}
            <motion.span
              key={user.userName}
              initial={{ opacity: 0, scale: 0.75 }}
              transition={{ ease: "easeInOut", delay: 1.5, duration: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              id="icon"
            >
              <GoVerified className="text-blue-400" />
            </motion.span>
          </p>
          <p className="captalize text-gray-400 text-xs">{user.userName}</p>
        </div>
        <div
          id="profile-info"
          className="hidden lg:flex flex-col gap-3 ml-[15%] text-sm"
        >
          <motion.div
            key={user.userName}
            initial={{ opacity: 0, y: 20 }}
            transition={{ ease: "easeOut", delay: 0.3, duration: 0.75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="created"
          >
            <p className="text-lightGray">
              Joined: {user._createdAt.slice(0, 10)}
            </p>
          </motion.div>
          <motion.div
            key={userVideos.length}
            initial={{ opacity: 0, y: 20 }}
            transition={{ ease: "easeOut", delay: 0.5, duration: 0.75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="posts"
          >
            <p className="text-lightGray ">
              Posted: {userVideos.length} videos
            </p>
          </motion.div>
          <motion.div
            key={userLikedVideos.length}
            initial={{ opacity: 0, y: 20 }}
            transition={{ ease: "easeOut", delay: 0.7, duration: 0.75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            id="likes"
          >
            <p className="text-lightGray">
              Liked: {userLikedVideos.length} videos
            </p>
          </motion.div>
        </div>
      </div>

      <div>
        <div className="flex gap-10 my-10 border-b-2 border-primaryTwo  w-full">
          <p
            className={`text-xl text-lightGray font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl text-lightGray font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
