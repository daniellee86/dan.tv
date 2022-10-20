import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:rounded-xl xl:hover:shadow-sidebarHover hover:text-colorTwo px-3 py-2 flex items-center gap-4 justify-center xl:justify-start  cursor-pointer text-colorOne ";

  const topicStyle =
    "group xl:rounded-xl xl:hover:shadow-sidebarHover hover:text-lightGray px-3 py-2 flex items-center gap-4 justify-center xl:justify-start cursor-pointer text-darkGray";

  return (
    <div className="xl:border-b-2 xl:border-primaryThree pb-6">
      <p className="text-lightGray font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-col justify-center xl:justify-start">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="text-3xl xl:text-md group-hover:text-colorOne">
                {item.icon}
              </span>
              <span className="text-sm hidden xl:block capitalize ">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
