import React from "react";
import ProdImage from "./prodImage";
import ProdDesc from "./prodDesc";
import ProdDelieryInfo from "./prodDeliveryInfo";
import styled from "styled-components";
import axios from "axios";

let ProductContainer = styled.div`
    width:100%;
    height: max-content;
    background-color:#f5f8fb;
    margin-top : 20px;
    padding : 20px 0;
`
let ProductWrapper = styled.div`
    width:1200px;
    height: max-content;
    padding: 20px;
    background-color:white;
    margin: 0 auto;

`
let ProductPageHeader = styled.div`
    width:max-content;
    height : max-content;
    padding:5px 15px;
    margin-bottom:20px;
    div{
        height:30px;
        background-color:${props=>props.data?'':'#e3e3e3'};
        text-align : left;
        margin-bottom:10px;
    }
    .productName{
        font-size:22px;
        font-weight:600;
    }
`
let ProductPageSubHeader = styled.div`
    display:flex;
    p{
        color:#9b9bb4;
        font-size:12px;
        text-align : left;
        margin:0 20px 0 5px;
        font-weight:500;
    }
    p>span{
        font-size:12px;
        color:#3e445a;
        
    }

`
let ProductPageBody = styled.div`
    width:100%;
    display : flex;
    &>div:first-child{
        width:40%;
        height:100%;
    }
    &>div:nth-child(2){
        width:30%;
        height:100%;
    }
    &>div:last-child{
        width:30%;
        height:100%;
    }
`
export default function ProdBody(){

    let [product,setProduct] = React.useState(null);
    React.useEffect(()=>{
        async function fetProds(){
            let url = window.location.search;
            let data = await axios.get('http://localhost:5000/getSome'+url);
            setProduct(data.data);
            
        }
        fetProds();
    },[])
    return(
        <ProductContainer>
            <ProductWrapper>
                <ProductPageHeader data={product}>
                    <div className="productName">{product?product.name:''}</div>
                    <ProductPageSubHeader>
                        {product  && <p>Brand: <span>{product.brand}</span></p>}
                        {product  && <p>Product Id: <span>{product.releasePrice}</span></p>}
                    </ProductPageSubHeader>  
                </ProductPageHeader>

                <ProductPageBody>
                    <ProdImage product={product}/>
                    <ProdDesc product={product}/>
                    <ProdDelieryInfo/>
                </ProductPageBody>


            </ProductWrapper>

        </ProductContainer>
    )
}