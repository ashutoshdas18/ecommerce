import React from "react";
import styled from "styled-components";
import axios from "axios";


let Quantity = styled.div`
display:flex;
align-items:center;
gap:15px;
&>div{
    background-color:${props=>props.product ? props.product.currStock>0?'#233a95':'#e3e3e3':'#e3e3e3' };
    height:40px;
    width:40px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:200ms;
    cursor:pointer;
}
span{
    width:20px;
    height:20px;
    text-align:center;
}
&>div:hover{
    background-color:#fcb900;
}
`

export default function CartQuantity({product,setCart}){
    let [descQuantity,setDescQuantity] = React.useState(0);
    React.useEffect(()=>{
        if(product){
            setDescQuantity(product.quantity)
        }
    },[product])
    async function changeQuantity(arg){
        console.log(arg)
        if(product){          
            setDescQuantity(descQuantity+arg);
            let res = await axios.post('http://localhost:5000/updateCart',{
                data:{
                    id:product._id,
                    quantity :arg,
                    sessionData:window.localStorage.getItem('session')
                }
            })
            setCart(res.data)
        }
    }
    return(
        <Quantity product={product}>
        <div className="descQuantityDec" onClick={e=>descQuantity>0?changeQuantity(-1):null}>
                <img src="https://img.icons8.com/material/24/ffffff/minus--v1.png"/>
                </div>
                <span>{descQuantity}</span>
                <div className="descQuantityInc" onClick={e=>product.currStock>product.quantity?changeQuantity(1):null}>
                <img src="https://img.icons8.com/android/24/ffffff/plus.png"/>
                </div>
        </Quantity>
    )
}