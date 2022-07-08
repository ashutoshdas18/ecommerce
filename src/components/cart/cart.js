import React from "react";
import styled from "styled-components";
import axios from "axios";

let CartContainer = styled.div`
    height:400px;
    width:calc(100% - 40px);
    padding:20px;
    background-color : #f5f8fb;
`
let CartWrapper = styled.div`
    width:1200px;
    height:100%;
    background-color:white;
    margin:0 auto;
    &>div{
        display:flex;
    }
    &>div>img{
        height:100px;
        width:100px;
        object-fit:contain;
    }
    &>div>.productDetails>.cartPricing{
        display:flex;
        gap:10px;
    }
`

export default function Cart(){
    let[cart,setCart]=React.useState(null);
    React.useEffect(()=>{
        async function getCart(){
            let cartData = await axios.get('http://localhost:5000/getCart');
            setCart(cartData.data);
        }
        getCart();
    },[])
    return(
        <CartContainer>
            <CartWrapper>
                {cart && <>
                    {cart.map((e,key)=><div key={key}>
                        <img src={e.photo}/>
                        <div className="productDetails">
                            <p>{e.name}</p>
                            <p>{e.brand}</p>
                            <p>Quantity:{e.quantity}</p>
                            <div className="cartPricing">
                                <p>{e.releasePrice}</p>
                                <p>{e.currPrice}</p>
                                <p>{Math.ceil((e.currPrice/e.releasePrice)*100)}%</p>
                            </div>
                        </div>

                    </div>)}
                </>}
            </CartWrapper>
        </CartContainer>
    )
}