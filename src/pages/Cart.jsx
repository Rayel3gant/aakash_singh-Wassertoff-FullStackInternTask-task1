import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'

const Cart = () => {
  const { cart , totalItems, total }=useSelector((state)=>state.cart)
  

  const totalPrice=total.toFixed(2);
  useGSAP(()=>{
    gsap.to('.textContent',{
      opacity:1,
      y:-50,
      duration:3,
      ease:'power2.inOut',
      delay:1
    })
  },[])


  const buyHandler=()=>{

  }




  return (
    <>
      {
        (cart.length===0) ? (
          <div className='textContent w-full h-[calc(100vh-7rem)] text-xl font-semibold opacity-0 overflow-hidden flex justify-center items-center'>
            Cart is empty!!!
          </div>
        ) : (

          <div className='w-11/12 lg:w-3/4 mx-auto flex flex-col-reverse gap-y-8  lg:flex-row justify-between my-20'>
            
            <div className='w-full lg:w-3/4 bg-[#007FFF] rounded-sm'>
            {
              cart.map((item)=>(
                <CartItem key={item.id} data={item}/>
              ))
            }
            </div>


            <div className='w-fit lg:w-[20%] p-4 rounded-md bg-[#041E42] text-white h-fit'>
              <p>Total Items : {totalItems}</p>
              <p>Total Price : <span className='text-xl'>{totalPrice} $</span></p>

              <button onClick={buyHandler} className='bg-black px-3 py-2 rounded-md text-white font-bold mt-8'>Buy Now</button>
            </div>

          </div>
        )
      }
    </>
  )
}

export default Cart