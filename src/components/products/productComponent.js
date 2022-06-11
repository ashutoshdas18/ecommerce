import React from "react";
import styledComponents,{keyframes} from "styled-components";
// import styledComponents from "styled-components";

let play = keyframes`
    from{
        left:0
    }to{
        left:90%;
    }
`

let RegularDeals = styledComponents.div`
    border:1px solid #c2c2d3;
    text-align:center;
    padding:20px 10px 10px 10px;
    position:relative;

    //Pill shaped element for displaying percentage ;
    &:before{
        content:'${props=>props.discount?props.discount+'%':''}';
        position:absolute;
        left:20px;
        color:white;
        font-family:var(--font-secondary);
        background-color:${props=>props.available ? '#2bbef9': ''};
        font-size:14px;
        height:25px;
        width:40px;
        line-height:22px;
        border-radius:5px;
    }

    .img{
        height:200px;
        width:200px;
        object-fit:contain;
    }
    &>p{
        position:relative;
    }

    //For placing the skeleton 
    .productName:before{
        content:'';
        height:100px;
        width:40px;
        top:0;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 80%
          );
        position:absolute;
        left:0;
        // animation:${play} 300ms linear infinite;  // Stopped Animation
        display:${prop=>prop.available?'none':'block'};
        z-index:2;
    }
    .productName{
        text-align:left;
        font-size:15px;
        margin-top:20px;
        font-weight:500;
        padding-left:15px;
    }
    .productBrand{
        text-align:left;
        font-size:13px;
        margin-top:5px;
        padding-left:15px;
        color:#9e9ea5;
    }
    .productStock{
        text-align:left;
        font-size:14px;
        letter-space:0.75px;
        color:${props=>props.available==='A'?'#00b853':props.available==='NA'?'#d51243':''};
        margin-top:5px;
        padding-left:15px;
        font-family:var(--font-secondary);
        font-weight:500;
    }
    .productPrice{
        display:flex;
        justify-content:left;
        padding-left:15px;
        margin-top:10px;
        &>div:first-child{
            color:#a8a8b5;
            margin-right:10px;
        }
    }
`
export default function ProductComponent(props){
    let discount;
    let discountElement;

    function test(){
        let releasePrice = parseInt(props.data.releasePrice);
        let currPrice =parseInt(props.data.currPrice);
        discount = Math.ceil(((releasePrice-currPrice)/releasePrice)*100);
        let discountedDiv = <>
                            <div className="oldPrice"><s>&#8377;{props.data.releasePrice}</s></div>
                            <div className="newPrice">&#8377;{props.data.currPrice}</div>
                            </>
        
        let nonDiscountedElement = <div className="newPrice">&#8377;{props.data.currPrice}</div>;
        return discountElement= discount>0?discountedDiv:nonDiscountedElement;
    }
    let productDiv;
    if(props.data){
        discountElement = test();
        productDiv = <><img src={props.data?props.data.photo:''} alt='' className="img"/>
        <p className="productName">{props.data?props.data.name:''}</p>
        <p className="productBrand">{props.data?props.data.brand:''}</p>
        <p className="productStock">{props.data?props.data.currStock>0?'IN STOCK':'NOT AVAILABLE':''}</p>
        <div className="productPrice">
        {discountElement}
        </div></>
        
    }
    else{

        productDiv = <>
            <div className="img" style={{backgroundColor:'#e3e3e3',margin:'0 auto'}}></div>
            <p className="productName" style={{backgroundColor:'#e3e3e3',height:'30px'}}></p>
            <p className="productBrand" style={{backgroundColor:'#e3e3e3',height:'30px'}}></p>
            <p className="productStock" style={{backgroundColor:'#e3e3e3',height:'30px'}}></p>
        </>

    }
    return(
        
        <RegularDeals discount={discount?discount:null} available={props.data?props.data.currStock>0?'A':'NA':null}>
            {productDiv}
        </RegularDeals>
    )
}