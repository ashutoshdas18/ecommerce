import axios from "axios";
import React from "react";
import styled from "styled-components";
import cartImg from '../../img/empty-cart.svg'
import DefaultAddress from "./defaultAddress";
import UserWithAddress from "./withAddress";

let CheckoutContainer = styled.div`
    width:100%;
    height:max-content;
    background-color:#f5f8fb;
    padding: 20px 0 15px 0;
`

let CheckoutWrapper = styled.div`
    width:1200px;
    margin: 0 auto;
    background-color:white;
`

export default function Checkout(){
    let [userData,setUserData] = React.useState(null)
    React.useEffect(()=>{
        async function getUserData(){
            let res = await axios.post('http://localhost:5000/getUser',{
                sessionData : window.localStorage.getItem('session')
            })
            setUserData(res.data);
        }
        getUserData();
    },[])
    
    return(
        <CheckoutContainer>
            <CheckoutWrapper>
            {userData && <>
                {userData.cart.length<=0 &&<div className="emptyCart">
                    <p className="emptyCartLabel">No product available in your cart</p>
                    <div className="emptyCartItems">
                        <img src={cartImg} className="emptyCartImg" alt="" />
                        <p className="emptyCartItemsLabel">Please add something to your cart</p>
                    </div>
                    
                </div>}
            
                {userData.cart.length>0 && userData.defaultAddress==='' &&
                    <DefaultAddress cart={userData.cart}></DefaultAddress>
                }

                {userData.cart.length>0 && userData.defaultAddress!=='' &&
                    <UserWithAddress userData={userData}></UserWithAddress>
                }
            </>}
            </CheckoutWrapper>
        </CheckoutContainer>
        
    )
}