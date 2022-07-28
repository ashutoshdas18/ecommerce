import React from "react";
import styled from "styled-components";
import MiniChat from "./minichat";
import SellerDashboard from "./sellerDashboard";
import SellNew from "./sellNew";
let SellerContainer = styled.div`
    height:100%;
    width:100%;
`
let SellerHeader = styled.div`
    height : 60px;
    width:calc(100% - 40px);
    border-bottom :1px solid #e3e3e3;
    padding:0 20px;
    display:flex;
    justify-content :space-between;
    align-items :center;
    .sellerHeaderLeft{
        display:flex;
        align-items : center;
        width : max-content;
        gap : 20px;
        .sellerHedaerLeftLogo{
            height : 40px;
            width:40px;
            background-color :#233a95;
            border-radius : 25px;
            color :white;
            text-align:center;
            line-height : 40px;
        }

    }
    .sellerHeaderRight{
        display:flex;
        align-items : center;
        width : max-content;
        gap : 20px;
        .switchUserMode{
            height: 30px;
            font-size: 14px;
            background-color: #2bbef91c;
            border-radius: 25px;
            padding: 5px 20px;
            color: rgb(17, 123, 166);
            text-align: center;
            line-height: 30px;
        }
        .notification{
            background:url("https://img.icons8.com/material-outlined/48/000000/appointment-reminders--v1.png");
            height: 20px;
            width: 20px;
            background-size: contain;
        }
        .account{
            background:url('https://img.icons8.com/material-rounded/48/000000/guest-male.png');
            height: 20px;
            width: 20px;
            background-size: contain;
        }
    }
`
let SellerBody = styled.div`
    display : flex;
    height : calc(100vh - 62px);   
    .center_dashboard,.sellNewItem{
        display : flex;
        width:100%;
        padding : 20px;
    }
`
let SideBar = styled.div`
    width:60px;
    border-right:1px solid #e3e3e3;
    height:100%;
    display :  flex;
    flex-direction : column;
    align-items:space-between;
    padding: 20px 0;
    .sideBarTopLogos{
        display :  flex;
        flex-direction : column;
        justify-content : flex-start;
        align-items : center;
        height: 100%;
        gap: 30px;
        &>div{
            height: 20px;
            width: 20px;
            background-size: contain !important;
            cursor : pointer;
        }
        .dashboard{
            background:url("https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/64/000000/external-dashboard-ui-essential-kmg-design-basic-outline-kmg-design.png");
        }
        .chats{
            background:url("https://img.icons8.com/external-others-anggara-putra/64/000000/external-social-social-media-basic-others-anggara-putra-34.png");
        }
        .orders{
            background:url("https://img.icons8.com/ios/50/000000/order-history.png");
        }
        .insights{
            background:url("https://img.icons8.com/external-others-anggara-putra/64/000000/external-social-social-media-basic-others-anggara-putra-36.png");
        }
    }
`
export default function Seller({setSeller}){
    let[currComponent,setCurrComponent] = React.useState('dashboard')
    React.useEffect(()=>{
        setSeller(true)
    },[])

    function changeComponent(data){
        setCurrComponent(data)
    }
    return(
        <SellerContainer>
            <SellerHeader>
                <div className="sellerHeaderLeft">
                    <div className="sellerHedaerLeftLogo">A</div>
                    <p>Ashutosh Das</p>
                </div>
                <div className="sellerHeaderRight">
                    <div className="switchUserMode">
                        Switch to user
                    </div>
                    <div className="notification"></div>
                    <div className="account"></div>
                </div>
            </SellerHeader>
            <SellerBody>
                <SideBar>
                    <div className="sideBarTopLogos">
                       <div className="dashboard" onClick={event=>changeComponent('dashboard')}></div> 
                       <div className="chats" onClick={event=>changeComponent('chats')}></div> 
                       <div className="orders" onClick={event=>changeComponent('orders')}></div> 
                       <div className="insights" onClick={event=>changeComponent('insights')}></div> 
                    </div>
                    <div className="sideBarBottomLogos"></div>
                </SideBar>
                {currComponent==='dashboard' && <div className="center_dashboard">
                    <SellerDashboard>
                    
                    </SellerDashboard>
                    <MiniChat>

                    </MiniChat>
                </div>}
                {currComponent==='insights' && <div className="sellNewItem">
                    <SellNew></SellNew>    
                </div>}
            </SellerBody>
        </SellerContainer>
    )
}