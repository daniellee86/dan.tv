//REACT IMPORTS
import { useState } from 'react';
//NEXT IMPORTS
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
//GOOGLE LOGIN
import GoogleLogin from 'react-google-login';
//COMPONENT IMPORTS
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
//REACT ICONS
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineHome } from 'react-icons/md';

const Sidebar = () => {
  //STATE FOR SIDEBAR HAMBURGER/CLOSE BUTTON
  const [showSidebar, setShowSidebar] = useState(true)

  const userProfile = false

  //TAILWIND VARIABLES
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded'


  return (
    <div>
      <div
      className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      // ONCLICK SETS SIDEBAR STATE TO OPPOSITE PREV STATE
      onClick={() => setShowSidebar((prev) => !prev)}
      >
       {showSidebar ? <MdOutlineCancel/> : <AiOutlineMenu/>}
      </div>

      {showSidebar && (
        <div 
        className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r border-gray-100 xl:border-0 p-3'>
          <div
          className='xl:border-b border-gray-200
          xl:pb-4'
          >
           <Link href={"/"}>
             <div className={normalLink}>
               <p className='text-2xl'>
                <AiOutlineHome/>
               </p>
               <span className='text-xl hidden xl:block'>
                For You
               </span>
             </div>
           </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-2 hidden xl:block'>
              <p
              className='text-gray-400'
              >Log in to like and comment on videos
              </p>
              <div className='pr-4'>
                <GoogleLogin 
                clientId=''
                render={(renderProps) => (
                  <button
                  className='bg-white text-lg font-semibold px-6 py-3 w-full mt-3 cursor-pointer border-[1px] hover:text-white hover:bg-black'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  >
                   Log In 
                  </button>
                )}
                onSuccess={() => {}}
                onFailure={() => {}}
                cookiePolicy='single_host_origin'
                />
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar