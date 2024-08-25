import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import { FaCartPlus } from "react-icons/fa";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useForm } from 'react-hook-form';
import { Carousel } from 'react-responsive-carousel';
import MiniCard from '../components/MiniCard';
import { addToCart } from '../redux/slices/Cart';
import { IoMdArrowBack } from "react-icons/io";
import { AddProductReview, updateProductStock } from '../redux/slices/Products';

const Details = () => {
  const { currentProduct , products }=useSelector((state)=>state.products)
  const { cart }=useSelector((state)=>state.cart)
  const [productStatus,setProductStatus]=useState(false)

  useEffect(()=>{
    cart.forEach(element => {
      if(element.id === currentProduct.id){
          setProductStatus(true)
          console.log("product already in cart")
          return
      }
    });
  },[cart])
  const dispatch=useDispatch()

  const [quantity,setQuantity]=useState(1)
  const [relatedProducts,setRelatedProducts]=useState([])
  console.log(currentProduct?.tags[0])


  useEffect(()=>{
    const temp=[]

    for(let i=1;i<=products.length;i++){
      if(products[i]?.tags.includes(currentProduct.tags[0])){
        temp.push(products[i])
      }
    }
    temp.slice(0,10)
    setRelatedProducts(temp)
    console.log(relatedProducts)
  },[])

  const [reviews,setReviews]=useState(currentProduct?.reviews)
  console.log(reviews)

  const {
    register,
    handleSubmit,
    formState:{errors}
  } =useForm()


  const decreaseQuantityHandler=()=>{
    if(quantity!==1){
      setQuantity(quantity-1)
    }
  }

  const increaseQuantityHandler=()=>{
    if(quantity<currentProduct.stock){
      setQuantity(quantity+1)
    }
  }

  const ratingSort=()=>{
    let temp=[...reviews]
    temp.sort((a,b)=> b.rating -a.rating)
    setReviews(temp)
    console.log(reviews)
  }

  const dateSort=()=>{
    let temp=[...reviews]   
    temp.sort((a,b)=>b.date-a.date)
    setReviews(temp)
    console.log(reviews)
  }


  const submitHandler=async(data)=>{
    console.log(data)

    const reviewData={
      id:currentProduct.id,     
      rating: data.rating,
      comment: data.review,
      date: Date.now(),
      reviewerName: data.name,
      reviewerEmail: data.email           
    }
    dispatch(AddProductReview(reviewData))
    setReviews([...reviews,reviewData])
  }

  const add2cartHandler=()=>{
    const productData={
      id:currentProduct.id,
      name:currentProduct.title,
      quantity,
      price:quantity*currentProduct.price,
      image:currentProduct.thumbnail
    }


    const stockData={
      productId:currentProduct.id,
      productQuantity:quantity,
      type:"decrease",
    }

    dispatch(addToCart(productData))
    dispatch(updateProductStock(stockData))
    
    console.log("product added to cart",productData)
  }

  const starsChange=()=>{

  }
  return (
    <div className='my-20'>

      <Link to='/' className='flex items-center gap-x-2 ml-12 px-4 py-2 border-2 bg-gray-300 hover:bg-white hover:scale-105 transition-all duration-1000 border-blue-950 rounded-md  w-fit   font-bold'>
        <IoMdArrowBack className='text-xl'/>
        <p>Go back</p>
      </Link>

      <div className='w-[80%] mx-auto flex flex-col-reverse md:flex-row gap-y-6 gap-x-8  items-center  bg-[#f0f1ff] rounded-md shadow-xl p-2 my-8  lg:my-20'>


        <img src={currentProduct?.images[0]} alt='image' className='w-3/4 md:w-[30%] h-[400px] bg-red-500 max-lg:translate-y-12 lg:-translate-x-12 rounded-md'/>

        <div className='md:h-[500px] w-[1px] bg-black'></div>

        <div className='flex flex-col w-11/12 md:w-[60%]'>
          <p className='text-xl font-bold'>{currentProduct?.title}</p>
          <p className='text-sm text-gray-500'>{currentProduct?.description}</p>

          <p className='text-lg mb-2'>$ <span className='text-4xl font-bold'>{currentProduct?.price}</span></p>


          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            value={currentProduct?.rating}
            edit={true}
            onChange={starsChange}
            
          />

          <p className='text-sm text-gray-500'>Stock: {currentProduct?.stock}</p>


          <div className='flex items-center my-2'>
              <button onClick={decreaseQuantityHandler} className='w-[30px] h-[30px] flex justify-center items-center bg-gray-200 border-r-2 border-black'>-</button>
              <p className='w-[30px] h-[30px] flex justify-center items-center bg-gray-200'>{quantity}</p>
              <button onClick={increaseQuantityHandler} className='w-[30px] h-[30px] flex justify-center items-center bg-gray-200 border-l-2 border-black'>+</button>

          </div>


          {
            (productStatus===false) ? (
              <button onClick={add2cartHandler} className='w-full py-2 flex items-center justify-center gap-x-2  rounded-md bg-[#69d269] font-bold'>
                <p>Add to cart</p>
                <FaCartPlus className='text-xl'/>
            </button>
            ) : (
              <button className='w-full py-2 flex items-center justify-center gap-x-2  rounded-md bg-[#69d269] font-bold'>
                <p>Added to cart</p>
              </button>
            )
          }

        </div>

      </div>


      <div className='w-11/12 mx-auto max-lg:mt-24 my-12 '>
        <p className='text-xl font-semibold'>Reviews from trusted customers</p>

        <div className='flex my-4 gap-x-2 iteme-start '>

          <p>sort by:</p>

          <div className='flex items-center gap-x-2'>
            <button className='p-2 border border-black rounded-md' onClick={ratingSort}>rating</button>
            <button className='p-2 border border-black rounded-md' onClick={dateSort}>date</button>
          </div>

        </div>

        <Accordion className=''>
          {
            reviews.map((item,index)=>(
              <AccordionItem key={index}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    {item.comment}
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <div>
                    <p>rating: {item.rating}</p>
                    <p>By :{item.reviewerName} </p>
                    <p>{item.date}</p>
                  </div>

                </AccordionItemPanel>

              </AccordionItem>
            ))
          }
        </Accordion>


      </div>


      <div className='w-11/12 mx-auto flex flex-col gap-7 lg:justify-between lg:flex-row items-start py-12 mt-12 '>

        <div className='w-11/12 mx-auto lg:w-[700px] flex flex-col '>
          <p className='text-xl font-semibold'>Submit a review</p>

          <form onSubmit={handleSubmit(submitHandler)} className='w-full lg:w-[500px]  bg-[#f0f1ff] flex flex-col gap-y-4 p-4 rounded-md   mt-8'>

            <div className='w-full'>
                <label htmlFor='name' className=' text-sm'>User Name</label><br></br>
                <input type='text' name='name' id='name' placeholder='Enter name' className=' border-b-2 outline-none border-blue-950 p-3 rounded-md w-full'  {...register ("name" ,{required:true})}></input>

                {  
                    errors.name && (
                        <span>Please enter your  name</span>
                    )
                }
            </div>

            <div className='w-full'>
                <label htmlFor='email' className=' text-sm'>Email</label><br></br>
                <input type='email' name='email' id='email' placeholder='Enter email' className=' border-b-2 outline-none border-blue-950 p-3 rounded-md w-full'  {...register ("email" ,{required:true})}></input>

                {  
                    errors.email && (
                        <span>Please enter your  email</span>
                    )
                }
            </div>

            <div className='w-full'>
                <label htmlFor='review' className=' text-sm'>Review</label><br></br>
                <input type='text' name='review' id='review' placeholder='Enter review' className=' border-b-2 outline-none border-blue-950 p-3 rounded-md w-full'  {...register ("review" ,{required:true})}></input>

                {  
                    errors.review && (
                        <span>Please enter review </span>
                    )
                }
            </div>

            <div className='w-full'>
                <label htmlFor='rating' className=' text-sm'>RatIng</label><br></br>
                <input type='number' min={0} max={5} name='raing' id='rating' placeholder='Enter raing' className=' border-b-2 outline-none border-blue-950 p-3 rounded-md w-full'  {...register ("rating" ,{required:true})}></input>

                {  
                    errors.rating && (
                        <span>Please enter rating</span>
                    )
                }
            </div>


            <button type='submit' className='px-3 py-2 w-fit mt-12 rounded-md bg-slate-300 hover:bg-black hover:text-white transition-all duration-1000 hover:font-semibold'>
              Post Review
            </button>



          </form>
        </div>

        <div className='w-11/12 mx-auto lg:w-[400px] flex flex-col '>
          <p className='text-xl font-semibold'>Related Products</p>

          <Carousel className='mt-8' width="400px" autoPlay axis='horizontal' infiniteLoop showArrows={false} showStatus={false} showIndicators={false} showThumbs={false}>
            {
              relatedProducts.map((item)=>(
                <MiniCard key={item.id} data={item}/>
              ))
            }
          </Carousel>

        </div>

      </div>




    </div>
  )
}

export default Details