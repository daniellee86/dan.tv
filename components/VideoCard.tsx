import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";


import { Video } from "./../types";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  // if (!isShowingOnHome) {
  //   return (
  //     <div>
  //       <Link href={`/detail/${_id}`}>
  //         <video
  //           loop
  //           src={video.asset.url}
  //           className="w-[250px] md:w-full rounded-xl cursor-pointer"
  //         ></video>
  //       </Link>
  //       <div className="flex gap-2 -mt-8 items-center ml-4">
  //         <p className="text-white text-lg font-medium flex gap-1 items-center">
  //           <BsPlay className="text-2xl" />
  //           {likes?.length || 0}
  //         </p>
  //       </div>
  //       <Link href={`/detail/${_id}`}>
  //         <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
  //           {caption}
  //         </p>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 snap-center">
      <div>
        <div className="flex flex-col sm:flex-row gap-4 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10 border-2 border-lightGray rounded-full">
            <Link href={`/profile/${postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=" rounded-full"
                  src={postedBy?.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-lightGray">
                  {postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-400 hidden md:block">
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="mt-2 font-normal text-lightGray ">{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center lg:ml-20 lg:justify-start relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${_id}`}>
            <video
              loop
              ref={videoRef}
              src={video.asset.url}
              className="h-[350px] w-[250px] sm:h-[400px] sm:w-[450px] md:h-[400px] lg:h-[600px] lg:w-[700px] rounded-2xl cursor-pointer bg-[url('../public/noise.gif')] bg-primaryOne bg-blend-darken"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute  cursor-pointer inset-x-0 bottom-5  flex justify-center gap-10">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-colorTwo text-2xl lg:text-4xl " />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-lightGray text-2xl lg:text-4xl " />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-colorTwo  text-2xl lg:text-4xl " />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-lightGray text-2xl lg:text-4xl " />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
