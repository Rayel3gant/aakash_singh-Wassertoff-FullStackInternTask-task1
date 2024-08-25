import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../slices/Products"
import cartReducer from "../slices/Cart"

const rootReducer=combineReducers({
    products:productReducer,
    cart:cartReducer
})


export default rootReducer