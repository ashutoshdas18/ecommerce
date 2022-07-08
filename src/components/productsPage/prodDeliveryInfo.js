import React from "react";
import styled from "styled-components";

let DeliveryInfoContainer = styled.div`

padding:0 20px;

`

let FastDeliveryInfo = styled.div`

    height : 35px;
    width:100%;
    text-align : center;
    line-height : 35px;
    font-size : 13px;
    font-weight : 500;
    background-color:#93bce7;
    color:#464682;
    margin-bottom:10px;
    border-radius:5px;

`

let DeliveryInfo = styled.div`
    height:max-content;
    width:100%;
    background-color:#f5f8fb;
    padding : 20px 0;
    ul>li{
        list-style-type:none;
        padding:5px 20px;
        display:flex;
        align-items : center;
        margin-bottom:10px;
    }
    ul>li>img{
        height : 30px;
        width:30px;
        margin-right : 15px;
        object-fit : contain;
    }
    ul>li>p{
        font-size:13px;
    }
`

export default function ProdDelieryInfo(){

    return(
        <DeliveryInfoContainer>
            <FastDeliveryInfo>
                Fast Delivery To All Major Cities
            </FastDeliveryInfo>
            <DeliveryInfo>
                <ul>
                    <li>
                        <img src="https://img.icons8.com/external-global-made-by-made/50/000000/external-culture-india-global-made-by-made-6.png" alt="" />
                        <p>Shipping all across India</p>
                    </li>
                    <li>
                        <img src="https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/000000/external-Shipping-e-commerce-outline-bartama-outline-64-bartama-graphic.png" alt="" />
                        <p> Free Shipping for orders above 500</p>
                    </li>
                    <li>
                        <img src="https://img.icons8.com/windows/32/000000/approval.png" alt="" />
                        <p> Guaranteed Original Items</p>
                    </li>
                    <li>
                        <img src="https://img.icons8.com/ios/50/000000/refund-2.png" alt="" />
                        <p>15 Days Return Policy</p>
                    </li>
                </ul>
            </DeliveryInfo>
        </DeliveryInfoContainer>
    )
}