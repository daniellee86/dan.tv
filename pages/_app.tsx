//NEXT IMPORTS
import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//REACT IMPORTS
import { useState, useEffect } from "react";
//GOOGLE LOGIN
import { GoogleOAuthProvider, useGoogleOneTapLogin } from "@react-oauth/google";
//CSS IMPORTS
import "../styles/globals.css";
//REACT-ICONS
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
//COMPONENT IMPORTS
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
