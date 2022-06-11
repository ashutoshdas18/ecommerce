import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/Homepage/homepage";
export default function Routers(){

    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            </Routes>
        </BrowserRouter>
        
    )

}