import React, { useEffect, useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/Cart';


const MiniCard = ({data}) => {
    const { cart }=useSelector((state)=>state.cart)
    const [productStatus,setProductStatus]=useState(false)

  useEffect(()=>{
    cart.forEach(element => {
      if(element.id === data.id){
          setProductStatus(true)
          console.log("product already in cart")
          return
      }
    });
  },[cart])

    const dispatch=useDispatch()
    const quantity=1;


    const clickHandler=()=>{

        const productData={
            id:data.id,
            name:data.title,
            quantity,
            price:quantity*data.price,
            image:data.thumbnail,
        }
        console.log(productData)
        dispatch(addToCart(productData))
        console.log("added tp cart")
    }

    
  return (
    <div className='w-[250px] h-[250px]  rounded-md relative overflow-hidden  cardBg'>

        <img alt='image' className='w-[150px] mx-auto h-[150px]' src={data?.thumbnail}/>

        <div className='flex flex-col items-start pl-2 gap-y-1 w-full'>
            <p className='text-sm'>{data?.title}</p>
            <h2 className='text-sm font-bold'>$ {data.price} </h2>
            {
                (data?.stock > 0) ? 
                    (<p className='text-sm text-green-300'>in stock</p>) : (<p className='text-sm text-red-500'>out of stock</p>)
            }

            
        </div>

        {
            (productStatus===false) && (
                <button onClick={clickHandler} className='absolute w-[50px] h-[50px] rounded-full flex justify-center items-center bg-red-500 -top-2 -right-1 z-10 '>
                    <FaCartPlus className='text-xl'/>
                </button>
            )
        }
    </div>
  )
}

export default MiniCard