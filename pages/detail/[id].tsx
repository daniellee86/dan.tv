//REACT AND NEXT
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"
//ICONS
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
//TYPESCRIPT TYPES
import { Video } from "../../types";
//MISC
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import axios from "axios";
//TYPESCRIPT INTERFACE
interface IProps {
  postDetails: Video;
}
//COMPONENT IMPORTS
import LikeButton from "../../components/LikeButton";
import Comments from "../../components/Comments";

const Detail = ({ postDetails }: IProps) => {
  //STATES
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [fade, setFade] = useState(true);
  //MISC INITIALISATIONS
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  //HANDLE VIDEO START AND PAUSE
  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  //USE EFFECT FOR VARIOUS FUNCTIONALITIES
  useEffect(() => {
    //MUTE IF CHECK
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  //FUNCTION TO BRING / ADD/ SUB LIKES
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
    //END OF USE EFFECT
  };

  //FUNCTION TO ADD COMMENTS
  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  //
  //FINAL IF CHECK TO CHECK IF THE POST EXISTS
  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-primaryOne flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-start bg-blurred-img bg-primaryOne bg-blend-darken">
        <div className="absolute top-4 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white hover:text-colorTwo text-[25px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}
            ></video>
          </div>

          <div className="absolute top-[45%] left-[40%] cursor-pointer">
            <button onClick={onVideoClick}>
              <BsFillPlayFill
                className={`text-white text-6xl lg:text-8xl transition-all duration-1000 ${
                  !playing ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="absolute top-4 right-2 lg:right-6 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-colorTwo text-2xl lg:text-2xl " />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-white text-2xl lg:text-2xl " />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-full">
        <div className="mt-5 ">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href={`/profile/${post.postedBy?._id}`}>
                <>
                  <Image
                    width={60}
                    height={60}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="user-profile"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy?._id}`}>
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-lightGray">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-400 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="mt-3 px-10 text-lg text-lightGray">{post.caption}</p>

          <div className="my-5 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            comments={post.comments}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
          />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
