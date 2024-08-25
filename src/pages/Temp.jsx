import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const Temp = () => {

    useGSAP(()=>{
        gsap.to(".boxes",{
            x:50,
            duration:2,
            scale:0.5,
            ease:'bounce',
            stagger:{
                each:0.5
            }
        })
    },[])
  return (
    <div className='w-full h-screen mt-12 flex flex-col gap-y-4 '>
        <div className='w-[100px] h-[100px] bg-blue-300 boxes' />
        <div className='w-[100px] h-[100px] bg-blue-300 boxes'/>
        <div className='w-[100px] h-[100px] bg-blue-300 boxes'/>
        <div className='w-[100px] h-[100px] bg-blue-300 boxes'/>

    </div>
  )
}

export default Temp