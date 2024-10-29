import React from 'react'
import { MdLiveTv } from "react-icons/md";
import Sidenav from './templates/sidenav';
import Topnav from './templates/Topnav';
const Home = () => {
  return (
    <>
        <Sidenav/>
        <div className='w-[80%] h-full '>
          <Topnav/>
        </div>
    </>
  )
}

export default Home