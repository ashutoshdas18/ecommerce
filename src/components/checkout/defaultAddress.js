import React from "react";
import styled from "styled-components";
import axios from "axios";

let Checkoutpage = styled.div`
    width : calc(100% - 40px);
    display:flex;
    padding : 20px;
    .addressDetails{
        width:70%;
        border : 1px solid #e3e3e3;
        border-radius :5px;
        padding:20px;
        &>div{
            display:flex;
            flex-direction:column;
            label{
                font-size:13px;
                margin-bottom:10px;
            }
            input{
                width : calc(100% - 50px);
                height : 35px;
                padding-left:10px;
                border:none;
                margin-bottom:10px;
                background-color:#f3f4f7;
            }
            p{
                color:red;
                font-size:14px;
                margin-bottom:10px;
            }
        }
    }
`

let CartSummary = styled.div`
    height:calc(100% - 30px);
    width:calc(30% - 45px);
    border:1px solid #e3e3e3;
    padding: 15px 15px;
    margin-left:10px;
    border-radius : 5px;
    .cartTotalLabel{
        font-family:var(--font-secondary);
        font-size:18px;
        font-weight:500;
        margin-bottom:10px;
    }
    .cartPrice{
        display : flex;
        border-bottom:1px solid #e3e3e3;
        padding-bottom:15px;
        justify-content :space-between;
        p{
            font-size:14px;
        }
    }
    .breakdown{
        .breakdownLabel{
            font-size: 14px;
            font-weight: 500;
            margin-top: 15px;
            margin-bottom : 10px;
        }
        .priceBreakdown>div{
            display:flex;
            justify-content : space-between;
            margin-bottom : 15px;
        } 
        .priceBreakdown>div:last-child{
            padding-bottom : 20px;
            border-bottom : 1px solid #e3e3e3;

        } 
        .priceBreakdown>div>p{
            font-size:13px;
        }
        
    }
    .total{
        display:flex;
        justify-content : space-between;
        padding-bottom : 15px;
        border-bottom :  1px solid #e3e3e3;
        .totalTag{
            font-size : 14px;
            font-weight : 500;
        }
        .totalValue{
            font-size : 18px;
            font-weight : 500;
        }
    }
    .checkoutBtn{
        height : 35px;
        width:calc(100% -30px);
        padding : 2px 15px;
        background-color : #233a95;
        color:white;
        text-align : center;
        line-height : 35px;
        border-radius :5px;
        font-size : 14px;
        margin-top : 15px;
        cursor:pointer;
    }
`

export default function DefaultAddress({cart}){
    let [error,setError] = React.useState(false)
    let [userDetails,setUserDetails] = React.useState({
        name:'',
        number:'',
        addOne:'',
        addTwo:'',
        landmark:'',
        city:'',
        state:'',
        pin:'',
        
    })
    let x=0;
    let cartTotal =0;
    let cartDiscount=0
    if(cart){
        
        if(cart.length>0){
            cart.forEach(item=>{
                x=x+(item.quantity*item.currPrice);
                cartTotal=cartTotal+(item.quantity*item.releasePrice)
                cartDiscount = cartTotal-x;
            })
        }
    }
    async function handleNewAddress(){
        let temp=false;
        for(let i in userDetails){
            if(userDetails[i]==='' && i!=='landmark' && i!=='addTwo' ){
                setError(true);
                temp=true;
                break;
            }
        }
        if(!temp){
                let res = await axios.post('http://localhost:5000/newAddress',{
                    data:userDetails,
                    session : window.localStorage.getItem('session')
                })
                if(res.data){
                    window.location.href = '/order'
                }
            }
        

    }
    function addressChange(event,data){
        let currAddress = {...userDetails};
        currAddress[data] = event.target.value;
        setUserDetails(currAddress);
    }
    return(
        <Checkoutpage>
                <div className="addressDetails">
                    <div className="fullName">
                        <label>Full name</label>
                        <input type="text" placeholder="Enter your name" onChange={event=>addressChange(event,'name')}/>
                        {error&&userDetails.name===''&&<p style={{color:'red'}}>Enter the name</p>}
                    </div>
                    <div className="number">
                        <label>Mobile number</label>
                        <input type="text" placeholder="Enter your number" onChange={event=>addressChange(event,'number')}/>
                        {error&&userDetails.number===''&&<p style={{color:'red'}}>Enter the number</p>}
                    </div>
                    <div className="addOne">
                        <label>Address Line 1</label>
                        <input type="text" placeholder="House No.,Flat No. etc." onChange={event=>addressChange(event,'addOne')}/>
                        {error&&userDetails.addOne===''&&<p style={{color:'red'}}>Enter address line 1</p>}
                    </div>
                    <div className="addTwo">
                        <label>Address Line 2</label>
                        <input type="text" placeholder="Street name or locality etc. (Optional)" onChange={event=>addressChange(event,'addTwo')}/>
                    </div>
                    <div className="landmark">
                        <label>Landmark</label>
                        <input type="text" placeholder="Landmark (Optional)" onChange={event=>addressChange(event,'landmark')}/>
                    </div>
                    <div className="city">
                        <label>City</label>
                        <input type="text" placeholder="City" onChange={event=>addressChange(event,'city')}/>
                        {error&&userDetails.city===''&&<p style={{color:'red'}}>Enter the city</p>}
                    </div>
                    <div className="state">
                        <label>State</label>
                        <input type="text" placeholder="State" onChange={event=>addressChange(event,'state')}/>
                        {error&&userDetails.state===''&&<p style={{color:'red'}}>Enter the state</p>}
                    </div>
                    <div className="pin">
                        <label>PIN / ZIP code</label>
                        <input type="text" placeholder="PIN or ZIP Code" onChange={event=>addressChange(event,'pin')}/>
                        {error&&userDetails.pin===''&&<p style={{color:'red'}}>Enter the PIN</p>}
                    </div>
                    
                </div>
                <CartSummary>
                    <p className="cartTotalLabel">CART TOTAL</p>
                    <div className="cartPrice">
                        <p className="amount">Subtotal</p>
                        <p className="amountValue">{x}</p>
                    </div>
                    <div className="breakdown">
                        <p className="breakdownLabel">Price breakdown</p>
                        <div className="priceBreakdown">
                            <div className="releasePrice">
                                <p className="releasePriceLabel">Cart total</p>
                                <p className="releasePriceValue">{cartTotal}</p>
                            </div>
                            <div className="discountPrice">
                                <p className="discountPriceLabel">Cart discount</p>
                                <p className="releasePriceValue">{cartDiscount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="total">
                        <p className="totalTag">Total</p>
                        <p className="totalValue">{x}</p>
                    </div>
                    <div className="checkoutBtn" onClick={handleNewAddress}>Proceed to checkout</div>
                </CartSummary>
            </Checkoutpage>
    )
}