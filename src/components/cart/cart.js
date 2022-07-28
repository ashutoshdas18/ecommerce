import React from "react";
import styled from "styled-components";
import axios from "axios";
import CartQuantity from "./cartQuantity";
import cartImg from '../../img/empty-cart.svg'

let CartContainer = styled.div`
    height:600px;
    width:calc(100% - 40px);
    padding:20px;
    background-color : #f5f8fb;
`
let CartWrapper = styled.div`
    width:1200px;
    height:100%;
    background-color:white;
    margin:0 auto;
    display:flex;
    .emptyCart{
        border:none !important;
        position:relative;
        height : 100%;
        width : 100%;
        p{
            font-size:14px;
        }
        .emptyCartItems{         
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            img{
                height:150px;
                width:150px;
                object-fit:contain;
            }
        }
    }

    .cartItems{
        width:70%;
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
    .deleteItems{
        background-image : url("https://img.icons8.com/external-others-anggara-putra/64/000000/external-social-social-media-basic-others-anggara-putra-15.png");
        height :25px;
        width : 25px;
        background-size :  contain;
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
    form{
        height : 100px;
        width:250px;
        background-color : white;
        position:absolute;
        top:calc(50% - 50px);
        left:calc(50% - 125px);
        border-radius : 5px;
        padding : 10px 20px;
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        label{
            font-size : 14px;
        }
        input{
            height : 35px;
            width : max-content;
            padding : 5px 20px;
            background-color : #233a95;
            border:none;
            border-radius : 5px;
            color : white;
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
        form{
            display: flex;
            justify-content: space-between;
            padding-bottom : 20px;
            margin-bottom : 15px;
            border-bottom : 1px solid #e3e3e3;
        }
        form>input:first-child{
            height: 30px;
            margin-right: 10px;
            width: calc(70% - 10px);
            color : #777;
            padding-left : 10px
        }
        form>input:last-child{
            height: 35px;
            width: max-content;
            padding: 0 20px;
            background-color :  #233a95;
            color:white;
            border:none;
            border-radius : 5px;
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
    }
`

export default function Cart(){
    let[cart,setCart]=React.useState(null);
    let [filmState,setFilmState] = React.useState(false)
    let [currItem,setCurrItem] = React.useState(null);
    let [coupon,setCoupon] = React.useState('');
    React.useEffect(()=>{
        async function getCart(){
            let cartData = await axios.post('http://localhost:5000/getCart',{
                data:{
                    sessionData : window.localStorage.getItem('session')
                }
            });
            setCart(cartData.data);
        }
        getCart();
    },[])
    function removeFilm(e){
        console.log(filmState)
        if(!filmState && arguments[1]){
            setFilmState(true)
            setCurrItem(arguments[1])

        }else setFilmState(false)
    }
    async function confirmDelete(e){
        e.preventDefault();
        let res = await axios.post('http://localhost:5000/deleteCartItem',{
            name :  currItem,
            session : window.localStorage.getItem('session')
        })
        setCart(res.data);
        setCurrItem(null);
    }
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
    function handleCouponChange(e){
        setCoupon(e.target.value);
    }
    async function handleCouponSubmit(){
        console.log(coupon)
    }
    function handleCheckout(){
        window.location.href='/shipping';
    }
    return(
        <CartContainer>
            <CartWrapper>
                {cart && cart.length<=0 && <div className="emptyCart">
                    <p className="emptyCartLabel">No product available in your cart</p>
                    <div className="emptyCartItems">
                        <img src={cartImg} className="emptyCartImg" alt="" />
                        <p className="emptyCartItemsLabel">Please add something to your cart</p>
                    </div>
                    
                </div>}
                {cart && cart.length>0 && <div className="cartItems">
                    {cart.map((e,key)=><div key={key}>
                        <img src={e.photo}/>
                        <div className="productDetails">
                            <p className="productName">{e.name}</p>
                            <CartQuantity product={e} setCart={setCart}></CartQuantity>
                            <div className="cartPricing">
                                <p>{e.currPrice*e.quantity}</p>
                            </div>
                            <div className="deleteItems" onClick={event=>removeFilm(event,e.name)}>
                            </div>
                        </div>

                    </div>)}
                </div>}
                {cart && cart.length>0 &&<CartSummary>
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
                            <form className="coupon" onSubmit={handleCouponSubmit}>
                                <input type="text" placeholder="Enter coupon code" onChange={handleCouponChange} />
                                <input type='submit' value="Apply"/>
                            </form>
                        </div>
                    </div>
                    <div className="total">
                        <p className="totalTag">Total</p>
                        <p className="totalValue">{x}</p>
                    </div>
                    <div className="checkoutBtn" onClick={handleCheckout}>Proceed to checkout</div>
                </CartSummary>}

            </CartWrapper>
            <FilmScreen filmState={filmState} onClick={removeFilm}>
                <form onSubmit={confirmDelete}>
                    <label>Are you sure of deleting ?</label>
                    <input type='submit' value="Enter"/>
                </form>
            </FilmScreen>
        </CartContainer>
    )
}