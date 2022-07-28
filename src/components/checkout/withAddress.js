import React from "react";
import styled from "styled-components";
import axios from "axios";
let Container = styled.div`
    height:100%;
    width:100%;
    display:flex;
`
let OrderDetails = styled.div`
    width:70%;
`
let DefaultAddress = styled.div`
    height : 40px;
    width:calc(100% - 20px);
    margin: 0 auto;
    padding: 10px 10px;
    border:1px solid #e3e3e3;
    display:flex;
    justify-content:space-between;
    align-items : center;
    margin-bottom : 10px;
    .topPortion>p{
        font-size : 14px;
        margin-bottom:5px;
    }
    .bottomPortion>p{
        font-size:13px;
        color:#777;
    }
    .changeAdd{
        height : 35px;
        width:max-content;
        padding: 0 15px;
        background-color : #233a95;
        color:white;
        line-height:35px;
        font-size:14px;
        border-radius : 5px;
    }
    
`
let CartItemWrapper = styled.div`
    .cartItems{
        width:100%;
        border : 1px solid #e3e3e3;
        border-radius: 5px;
    }
    .cartItems>div{
        display:flex;
        padding:20px 20px 0 20px;
        justify-content:space-between;
        border-bottom : 1px solid #e3e3e3;
    }
    .cartItems>div>img{
        height:100px;
        width:100px;
        object-fit:contain;
    }
    .cartPricing{
        display:flex;
        gap:10px;
    }
    .productDetails{
        display:flex;
        align-items:center;
        width:80%;
        justify-content:space-between;
        font-size:14px;
    }
    .productName{
        
        width:50%;
    }
    .productBrand{
        font-size:14px;
        color:#6f6f6f;
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

let FilmScreen = styled.div`
    position : absolute;
    height : 100vh;
    width : 100vw;
    background-color : #e3e3e387;
    left:0;
    top:0;
    display : ${props=>props.filmState?'block':'none'};
    
`
let AddressList = styled.form`
    height : max-content;
    width:400px;
    background-color : white;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius : 5px;
    padding : 10px 20px;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    label{
        font-size : 14px;
        margin-bottom : 15px
    }
    &>div>input{
        margin-right :10px;
    }
    &>div{
        display:flex;
        margin-bottom : 15px;
    }
    .topPart{
        font-size :14px;
    }
    .bottomPart{
        font-size : 13px;
        color : #777;
    }
    .addNewAddress{
        color :white;
        background-color : #233a95;
        text-align :center;
        width : 100%;
        height:50px;
        display:flex;
        justify-content :center;
        align-items : center;
        border-radius : 5px;
    }
`

export default function UserWithAddress({userData}){
    let [currAddress,setCurrAddress] = React.useState('')
    let [cart,setCart] = React.useState('')
    let [filmState,setFilmState] = React.useState(false);
    let [loading,setLoading] = React.useState(false)
    React.useEffect(()=>{
        setCurrAddress(JSON.parse(userData.defaultAddress));
        setCart(userData.cart)

    },[userData])
    let x=0;
    let cartTotal =0;
    let cartDiscount=0
    if(userData.cart){
        
        if(userData.cart.length>0){
            userData.cart.forEach(item=>{
                x=x+(item.quantity*item.currPrice);
                cartTotal=cartTotal+(item.quantity*item.releasePrice)
                cartDiscount = cartTotal-x;
            })
        }
    }
    function removeFilm(){
        if(filmState){
            setFilmState(false)
        }else setFilmState(true)
    }
    async function confirmDelete(event){
        let res = await axios.post(`http://localhost:5000/changeDefault`,{
            id: event.target.value,
            session : window.localStorage.getItem('session')
        }) ;
        if(res.data){
            setCurrAddress(JSON.parse(res.data.defaultAddress))
            setFilmState(false);
            event.target.checked=false;
        }
    }
    async function handlePayment(event){
        const script = document.createElement('script');
        script.src='https://checkout.razorpay.com/v1/checkout.js';
        script.onerror=()=>{
            alert('SDK failed to load')
        }
        script.onload = async()=>{
            try{
                setLoading(true);
                let {data} = await axios.post('http://localhost:5000/create-order',{
                    session:window.localStorage.getItem('session')
                })
                console.log(data)
                let options={
                    key:data.key,
                    amount : cartTotal*100,
                    "currency": "INR",
                    "name": "Shoppex",
                    "image": "https://i.postimg.cc/yN45qs42/Layer-2-a45682c7dfffed24d175.png",
                    order_id : data.id,
                    "handler": async function (response){
                        const res = await axios.post('http://localhost:5000/handle-pay',{
                            paymentId:response.razorpay_payment_id,
                            order_id:response.razorpay_order_id,
                            signature:response.razorpay_signature,
                            session:window.localStorage.getItem('session')
                        })
                        if(res){
                            window.location.href='/cart'
                        }
                    }
                }
                var rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', function (response){
                    alert(response.error.reason);
            });
            rzp1.open();
            }    
            catch(e){
                console.log(e)
            }
        }
        document.body.appendChild(script);
        setLoading(false);
    }
    return(
        <Container>
            <OrderDetails>
                <DefaultAddress>
                    <div className="defaultAddInfo">
                        <div className="topPortion">
                            <p>Deliver to {currAddress.name},{currAddress.pin}</p>
                        </div>
                           
                        <div className="bottomPortion">
                        <p>{currAddress.addOne},{currAddress.city},{currAddress.state}</p>
                        </div>
                    </div>
                    <div className="changeAdd" onClick={removeFilm}>Change</div>
                </DefaultAddress>
                <CartItemWrapper>
                    {cart && cart.length>0 && <div className="cartItems">
                        {cart.map((e,key)=><div key={key}>
                            <img src={e.photo}/>
                            <div className="productDetails">
                                <p className="productName">{e.name}</p>
                                <p className="cartQuantity">Quantity : {e.quantity}</p>
                                <div className="cartPricing">
                                    <p>{e.currPrice*e.quantity}</p>
                                </div>
                            </div>

                        </div>)}
                </div>}
                </CartItemWrapper>
                
            </OrderDetails>
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
                    {/* <div className="checkoutBtn" onClick={handlePayment}>Payment</div> */}
                    <button className="checkoutBtn" disabled={loading} onClick={handlePayment}></button>
                </CartSummary>
                <FilmScreen filmState={filmState} onClick={removeFilm}></FilmScreen>
                {filmState && <AddressList onSubmit={confirmDelete}>
                    <label>Addresses</label>
                    {userData.address.map((item,key)=><div key={key}>
                    <input type='radio' onClick={confirmDelete} value={key} key={key}/>
                    <div className="addressContainer">
                        <p className="topPart">{JSON.parse(item).name},{JSON.parse(item).pin}</p>
                        <p className="bottomPart">{JSON.parse(item).addOne},{JSON.parse(item).city},{JSON.parse(item).state}</p>
                    </div>
                    </div>)}
                    <div className="addNewAddress">Add new</div>
                </AddressList>}
        </Container>
    )

}