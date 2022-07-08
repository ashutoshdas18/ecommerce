import React from "react";
import styled from "styled-components";
import axios from "axios";

let DescContainer = styled.div`
    height:100px;
    width:100%;
    padding:15px;
`
let DescPrice  = styled.div`
    height : 30px;
    width : 50%;
    background-color : ${props=>props.product?'':'#e3e3e3'};
    .DescPriceWrapper{
        width : max-content;
        gap: 15px;
        display : flex;
        justify-content :space-between;
        align-items:center;
    }
    .prodReleasePrice{
        color:#b0b0bf;
        font-size:19px;
        font-family:var(--font-secondary);
        text-decoration: line-through;
    }
    .prodCurrPrice{
        font-size:24px;
        font-family:var(--font-secondary);
        color : #d51243;
        font-weight : 600;
    }
`
let DescStock = styled.div`
    height:30px;
    background-color : ${props=>props.product?'none':'#e3e3e3'};
    margin-top : 10px;
    width:100px;
    &>p{
        font-size:15px;
        font-family:var(--font-secondary);
        font-weight:500;
    }
    .productInStock{
        color:#00b853;
    }
    .productNotInStock{
        color :#d51243;
    }
`
let DescHighLights = styled.div`
    padding-left:15px;
    margin-bottom:20px;
    li{
        color: #6f6f6f;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 5px;
    }

`
let DescPinCheck = styled.div`
    margin-bottom:20px;
    .pincodeInput{
        border:none;
        border-bottom:1px solid #aaa !important;
        padding-bottom:5px;
        outline:none;
    }
`


let DescQuantity = styled.div`
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

let DescSize = styled.div`
    height:${props=>props.product?'max-content':'30px'}; ;
    width:60%;
    background-color:${props=>props.product?'':'#e3e3e3'};
    margin-top:15px;
    p{
        margin-bottom:15px;
    }
    .sizeContainer{
        display:grid;
        grid-template-columns : auto auto auto;
        gap:10px;
    }
    .sizeContainer>div{
        padding: 8px 15px;
        width:max-content;
        background-color:#e3e3e3;
        border-radius:5px;
        cursor:pointer;
    }
`
let DescCart = styled.div`
    height:40px;
    width: max-content;
    margin-top:20px;
    text-align:center;
    display:flex;
    gap:20px;
    div{
        font-size : 13px;
        width:max-content;
        padding:8px 15px;
        border-radius:23px;
        display:flex;
        align-items:center;
    }
    .cart{
        background-color:${props=>props.product ? '#233a95':'#e3e3e3'};
        color:white;
        cursor : ${props=>props.product ? 'pointer':'no-drop'};
    }
    .wishlist{
        border:1px solid #233a95;
    }
`

let DescInformation = styled.div``
export default function ProdDesc({product}){
    let [descQuantity,setDescQuantity] = React.useState(0)
    let [pin,setPin] = React.useState('');
    React.useEffect(()=>{
        if(product){
            if(product.currStock>0){
                setDescQuantity(1);
            }
        }
    },[product])

    function changeQuantity(arg){
        if(product)
        setDescQuantity(descQuantity+arg)
    }
    async function addToCart(){
        if(product.currStock>=descQuantity && product.currStock>0 && descQuantity>0){
            let res = await axios.post('http://localhost:5000/updateCart',{
                data:{
                    name:product.name,
                    quantity : descQuantity
                }
            })
            console.log(res.data);
        }
    }
    function addToWishlist(){
        console.log("Hello");
    }
    function pinSubmit(e){
        e.preventDefault();
        console.log(pin)
    }
    function pinChange(e){
        setPin(e.target.value);
    }
    return(
        <DescContainer>
            <DescPrice product={product}>
                {product && <div className="DescPriceWrapper">
                    {product.currPrice < product.releasePrice && <p className="prodReleasePrice">&#8377;{product.releasePrice}</p> }
                    <p className="prodCurrPrice">&#8377;{product.currPrice}</p>
                </div>}
            </DescPrice>
            <DescStock product={product}>
                {product && <>
                    {product.currStock > 1 && <p className="productInStock">
                        IN STOCK
                    </p>}
                    {product.currStock < 1 && <p className="productNotInStock">
                        NOT AVAILABLE    
                    </p>}
                </>}
            </DescStock>
            
            <DescHighLights>
                <ul>
                {product && product.highlights.map((e,key)=><li key={key}>{e}</li>)}
                </ul>
            </DescHighLights>
            
            <DescPinCheck>
                <form method="post" onSubmit={pinSubmit}>
                    <input type="text" className="pincodeInput" onChange={pinChange} value={pin} placeholder="Enter your pincode" />
                </form>
            </DescPinCheck>

            <DescQuantity product={product}>
                <div className="descQuantityDec" onClick={e=>descQuantity>0?changeQuantity(-1):null}>
                <img src="https://img.icons8.com/material/24/ffffff/minus--v1.png"/>
                </div>
                <span>{descQuantity}</span>
                <div className="descQuantityInc" onClick={e=>product.currStock>descQuantity?changeQuantity(1):null}>
                <img src="https://img.icons8.com/android/24/ffffff/plus.png"/>
                </div>
                
            </DescQuantity>
            <DescSize product={product}>
                {product && <>
                    <p>Sizes</p>
                    <div className="sizeContainer">
                    {product.sizes.map((e,key)=><div key={key}>{e}</div>)}
                    </div>
                    
                </>}
            </DescSize>
            <DescCart  product ={product?product.currStock>descQuantity?true:false:false}>
                <div className="cart" onClick={addToCart}>ADD TO CART</div>
                <div className ="wishlist" onClick={addToWishlist}>ADD TO WISHLIST</div>

            </DescCart>
            <DescInformation>

            </DescInformation>
        </DescContainer>
    )

}