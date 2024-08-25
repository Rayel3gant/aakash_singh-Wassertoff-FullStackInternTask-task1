import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../redux/slices/Products';
gsap.registerPlugin(TextPlugin);

const ProductCard = ({data}) => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const clickHandler=()=>{
    dispatch(setCurrentProduct(data))
    navigate(`/details/${data.id}`)
  }


  useGSAP(()=>{
    gsap.to('.textContent',{
      opacity:1,
      y:-50,
      duration:2,
      ease:'power2.inOut',
      delay:2
    })



    gsap.to(".productCard",{
      ease:'bounce',
      y:0,
      stagger:{
        each:0.3
      }
    })


  },[])



  return (
    <div className='w-[250px] h-[350px]  rounded-md  relative cardBg productCard '>
        <img alt='image' className='w-full h-[200px]' src={data?.thumbnail}/>

        <div className='textContent flex flex-col gap-y-1 w-full left-4 opacity-0 absolute bottom-0'>
            <p className='text-sm'>{data?.title}</p>
            <h2 className='text-2xl font-bold'>$ {data.price} </h2>

            <div className='flex w-full items-center gap-x-16'>
              <button onClick={clickHandler}>
                more info
              </button>


              <>
                {
                  (data?.stock > 0) ? 
                    (<p className='text-sm text-green-300 font-semibold'>in stock</p>) : (<p className='text-sm text-red-500 font-semibold'>out of stock</p>)
                }
              </>

              
            </div>
        </div>

        <div>

        </div>
    </div>

    
  )
}

export default ProductCard