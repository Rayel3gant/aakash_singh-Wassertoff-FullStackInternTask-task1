import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/slices/Products'
import Pagination from '../components/Pagination'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'


const Home = () => {

  const [loading,setLoading]=useState(false)
  const [productsData,setProductsData]=useState([])

  const itemsPerPage=20;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = productsData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productsData?.length / itemsPerPage);
  

  const { products }=useSelector((state)=>state.products)
  const dispatch=useDispatch()




  

  const fetchProductsData=async()=>{
    setLoading(true)
    try{

      if(products.length===0){
        const data =await fetch('https://dummyjson.com/products?limit=0').then(res => res.json())

        setProductsData(data.products)
        dispatch(setProducts(data.products))


                
      } else {
        setProductsData(products)
      }
      

    } catch(error){
      console.log(error)
      console.log("error in fetching products data")
    }

    setLoading(false)
  }


  const handlePageClick = (pageNumber) => {
    const newOffset = (pageNumber * itemsPerPage) % productsData?.length;
    console.log(
      `User requested page number ${pageNumber}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(()=>{
    fetchProductsData()
  },[])


  


  
  


  return (
    <div>
      {
        loading ? (
          <div className='w-full h-screen flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (

          <>
            <div className='w-11/12 mx-auto max-lg:gap-y-8  my-16  grid lg:grid-cols-3 xl:grid-cols-4  md:grid-cols-2 md:gap-4 grid-cols-1    lg:gap-y-12 justify-items-center  '>
              {
                currentItems.map((item)=>(
                  <ProductCard data={item} key={item.id}/>
                ))
              }

            </div>

            <Pagination pageCount={pageCount} paginate={handlePageClick} setLoading={setLoading}/>

          </>
          

        )
      }

    </div>
  )
}

export default Home