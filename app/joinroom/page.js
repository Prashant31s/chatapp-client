"use client"
import React, { useEffect } from 'react'
import Joinroom from './Joinroom'


function page() {
    // useEffect(()=>{
    //     document.body.style("green");
    // },[])
  return (
    
    <div className='flex justify-center m-2 p-3'>
        <Joinroom/>
    </div>
  )
}

export default page