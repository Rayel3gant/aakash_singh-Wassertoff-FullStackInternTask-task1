import { createSlice } from "@reduxjs/toolkit"



const initialState={
    products:localStorage.getItem("products")? JSON.parse(localStorage.getItem("products")):[],
    currentProduct:localStorage.getItem("currentProduct")? JSON.parse(localStorage.getItem("currentProduct")):null
}


const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts(state,value){
            state.products=value.payload
            localStorage.setItem("products", JSON.stringify(state.products))

        },
        setCurrentProduct(state,value){
            state.currentProduct=value.payload
            localStorage.setItem("currentProduct", JSON.stringify(state.currentProduct))

        },
        AddProductReview(state,action){
            const data=action.payload;

            const review={
                rating: data.rating,
                comment: data.comment,
                date: new Date(Date.now()).toLocaleDateString(),
                reviewerName: data.reviewerName,
                reviewerEmail: data.reviewerEmail
            }
            const productId=data.id;

            state.products.forEach(element => {
                if(element.id === productId){
                    element.reviews.push(review)
                    console.log("done")
                    return;
                }
            });
        },
        updateProductStock(state,action){
            const data=action.payload;
            // console.log(data)
            
            const productId=data.productId;
            const productQuantity=data.productQuantity;
            const type=data.type;

            console.log(productId)
            console.log(productQuantity)
            console.log(type)


            state.products.forEach(element => {
                if(element.id === productId){
                    if(type==="increase"){
                        element.stock += productQuantity
                    } else {
                        element.stock -= productQuantity
                    }
                    console.log(element.stock)
                    return
                }
            });
        }
    }
})

export const { setProducts , setCurrentProduct , AddProductReview , updateProductStock} =productSlice.actions
export default productSlice.reducer