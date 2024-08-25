import React, { useState } from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Pagination = ({ pageCount ,paginate ,setLoading }) => {

    const [currentPage, setCurrentPage]=useState(1)

    const pageNumbers=[]

    for(let i=1;i<=pageCount;i++){
        pageNumbers.push(i)
    }

    const pageChangeHandler=(item)=>{

        setLoading(true)
        setCurrentPage(item)
        console.log(item)
        console.log(currentPage)

        paginate(item)

        setTimeout(()=>{
            setLoading(false)
        },[2000])
    }

    const previousHandler=()=>{
        console.log(currentPage)
        if(currentPage!==1){
            pageChangeHandler(currentPage-1)
        }
    }

    const nextHandler=()=>{
        if(currentPage!==pageCount){
            pageChangeHandler(currentPage+1)
        }
    }


  return (
    <div className='flex w-screen items-center justify-center max-lg:gap-x-6 lg:gap-x-32 my-10 lg:my-32 '>
        <button className=' w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full flex  bg-blue-300 justify-center items-center' onClick={previousHandler}>
           <GrFormPrevious className='md:text-2xl text-xl'/>
        </button>


        <div className='flex items-center gap-x-2'>
        {
            pageNumbers.map((item)=>(
                <button key={item} className={`bg-blue-300 w-[20px] h-[20px]   md:w-[40px] md:h-[40px] text-[8px] md:text-sm rounded-full flex   justify-center items-center`} onClick={()=>pageChangeHandler(item)}>
                    {item}
                </button>
            ))
        }
        </div>

        <button className='w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full flex  bg-blue-300 justify-center items-center' onClick={nextHandler}>
            <GrFormNext className='md:text-2xl text-xl'/>
        </button>
    </div>
  )
}

export default Pagination