import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/Cart';
import { updateProductStock } from '../redux/slices/Products';

const CartItem = ({data}) => {
  console.log(data)
  const dispatch=useDispatch()

  const deleteHandler=()=>{
    console.log("deleting from cart",data)
    dispatch(removeFromCart(data))

    const stockData={
      productId:data.id,
      productQuantity:data.quantity,
      type:"increase",
    }
    dispatch(updateProductStock(stockData))
  }

  

  return (
    <div className='w-full flex items-center  '>


      <img src={data.image} alt='image' className='w-[200px] h-[250px] sm:w-[350px] sm:h-[300px]'/>

      <div className='flex flex-col items-start  gap-y-1 text-white'>
        <p>{data.title}</p>
        <p>Quantity: <span className='font-bold text-2xl'>{data.quantity}</span></p>
        <p>Total Price: $<span className='font-bold text-2xl'> {data.price}</span></p>

        <button className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FF00FF] hover:bg-[#FF00BF] hover:scale-105 transition-all duration-500' onClick={deleteHandler}>
          <MdOutlineDelete className='text-xl'/>
        </button>

      </div>
    </div>
  )
}

export default CartItem