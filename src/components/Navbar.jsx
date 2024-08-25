import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='w-full py-5 bg-red-500 flex flex-col gap-y-4  items-center'>

        <h1 className='uppercase md:text-4xl font-bold text-center text-black hover:text-white transition-all duration-1000 navHeading' data-testid="navHeading">
            E-Commerce Shop
        </h1>

        <div className='flex items-center gap-x-2'>
            <NavLink to='/' data-testid="homeButton">
                <FaHome className='text-xl'/>
            </NavLink>

            <div>|</div>
            
            <NavLink to='/cart' data-testid="cartButton">
                <FaShoppingCart className='text-xl'/>
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar