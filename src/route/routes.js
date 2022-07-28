import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Cart from "../components/cart/cart";
import Category from "../components/categories/categoryHome";
import Checkout from "../components/checkout/checkout";
import UserDashboard from "../components/dashboard/userDashboard";
import HomePage from "../components/Homepage/homepage";
import ProdBody from "../components/productsPage/prod";
import Seller from "../components/seller/sellerHome";

export default function Routers({setSeller}){
    
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/products" element={<ProdBody/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/category/:item" element={<Category/>}></Route>
            <Route path="/shipping" element={<Checkout/>}></Route>
            <Route path="/signup" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/dashboard" element={<UserDashboard/>}></Route>
            <Route path="/seller" element={<Seller setSeller={setSeller}/>}></Route>
            </Routes>
        </BrowserRouter>
        
    )

}