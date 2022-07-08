import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../components/cart/cart";
import Category from "../components/categories/categoryHome";
import HomePage from "../components/Homepage/homepage";
import ProdBody from "../components/productsPage/prod";
export default function Routers(){

    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/products" element={<ProdBody/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/category/:item" element={<Category/>}></Route>
            </Routes>
        </BrowserRouter>
        
    )

}