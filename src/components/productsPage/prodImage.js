import React from "react"
import styled from "styled-components"

let ProductPageImage = styled.div`
    display:flex;
    flex-direction : column;
    align-items : center;


    .ProductPageBanner{
        height:350px;
        width:250px;
        margin-bottom : 10px;
        background: ${props=>props.banner?'url('+props.banner+')':"#e3e3e3"};
        background-size:contain;
        background-repeat:no-repeat;
    }
    .ProductPagePreview{
        display:flex;
        gap:10px;
        cursor:pointer;
        img{
            height:50px;
            width:50px;
            object-fit : contain;
            
        }
        &>div{
            border :1px solid #e3e3e3;
            padding:5px;
            margin-bottom:10px;
            border-radius : 5px;
        }
    }
`
export default function ProdImage({product}){
    let [banner,setBanner] = React.useState(null);
    let [currPreview,setCurrPreview] = React.useState(null);
    
    React.useEffect(()=>{
        if(product)
        setBanner(product.photo);
    },[product])

    function changeBanner(event,data){
        if(currPreview){
        let element = currPreview
        element.style.border="1px solid #e3e3e3";
        }
        setCurrPreview(event.currentTarget);
        event.currentTarget.style.border ="1px solid";
        setBanner(data)
        
    }
    return(
        <ProductPageImage banner={banner}>
            <div className="ProductPageBanner"></div>
            <div className="ProductPagePreview">
                {product && product.preview.map((e,key)=><div onClick={event=>changeBanner(event,e)} key={key}><img src={e}/></div>)}
            </div>
        </ProductPageImage>
    )
}

