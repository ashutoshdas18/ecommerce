import React from "react";
import styled from "styled-components";

let OrderWrapper = styled.div`
    .ordersHeader{
        padding:20px;
        font-size:18px;
        font-weight:500;
    }
`
let OrderListWrapper = styled.div`
    height:max-content;
    margin-top:20px;
    &>div{
        border:1px solid #e3e3e3;
        padding : 15px 15px;
        margin-bottom : 15px;
        display :  flex;
        width: calc(100% - 30px);
        .orderImg{
            height : 40px;
            width : 40px;
            object-fit :  contain;
            margin-right : 15px;
        }
        &>div{
            width : 100%;
        }
    }

    &>div>div:last-child>div{
        display:flex;
        justify-content :  space-around;
        &>div>p:first-child{
            font-size:13px;
            color : #777;
            margin-bottom : 10px;
        }
        &>div>p:last-child{
            font-size: 14px;
            font-weight : 500;
        }
    }
`

export default function OrderDetails({data}){
    console.log(data)
    return(
        <OrderWrapper>
            <p className="ordersHeader">YOUR ORDERS</p>
            {data && data.orders.length>0 &&<OrderListWrapper>
                    {data.orders.map((item,key)=>
                    <div className="orderContainer" key={key}>
                        <img className="orderImg" src={item.photo} alt="" />
                        <div className="orderInfo">
                            <div className="orderPriceAndDate">
                                <div className="orderName">
                                    <p>Name</p>
                                    <p>{item.name}</p>
                                </div>
                                <div className="orderPrice">
                                    <p>Price</p>
                                    <p>{item.currPrice}</p>
                                </div>
                                <div className="orderQuantity">
                                    <p>Quantity</p>
                                    <p>{item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}</OrderListWrapper> }
        </OrderWrapper>
    )

}