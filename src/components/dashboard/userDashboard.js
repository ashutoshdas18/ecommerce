import React from "react";
import styled from "styled-components";
import axios from 'axios'
import AccountDetails from "./accountDetails";
import AddressDetails from "./addressDetails";
import OrderDetails from "./orderDetails";

let DashboardContainer = styled.div`
    width:100%;
    height:100vh;
    background-color:#f5f8fb;
    padding-top:20px;
`

let DashboardWrapper = styled.div`
    width:1200px;
    margin:0 auto;
    min-height: 70vh;
    display:flex;
    border-radius:5px;
    justify-content:space-between
`
let DashboardLeftView = styled.div`
    width:30%;
    display:flex;
    flex-direction : column;
    &>div{
        background-color:white;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    
`
let DashboardRightView = styled.div`
    width:calc(67% - 40px);
    background-color :white;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 20px;
    
`
let UserAccountDetails = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:20px;
    padding:20px;
    .logo{
        height:60px;
        width:60px;
        background-image:url('${props=>props.email?`https://avatars.dicebear.com/api/bottts/${props.email}.svg`:''}');
        background-size: contain;
        margin-right :20px;
    }
    .data{
        display:flex;
        flex-direction :  column;
        span{
            color:#777;
            font-size:12px;
        }
        p{
            font-size:14px;
        }
    }
`
let UserAccountOptions = styled.div`
    height : 100%;
    &>div{
        border-bottom:1px solid #e3e3e3;
        padding:20px;
    }
    .userAccOptTags{
        display:flex;
        align-items:center;
        margin-bottom:10px;
        img{
            height:30px;
            width:30px;
            object-fit:contain;
            margin-right : 20px;
        }
        p{
            font-size:16px;
            font-family : var(--font-secondary);
        }
    }
    .userAccOptions{
        display:flex;
        flex-direction : column;
        height:max-content;
        div{
            padding:10px 0 10px 50px;
            font-size:13px;
            transition:200ms;
        }
        div:hover{
            background-color:#3498db36;
        }
    }
`
export default function UserDashboard(){
    let [userData,setUserData] = React.useState(null);
    let [selectedField,setSelectedField] = React.useState('profileDetails')
    React.useEffect(()=>{
        if(!window.localStorage.getItem('session') || window.localStorage.getItem('session')==='' ){
            window.location.href = '/login'
        }else{
            async function auth(){
                try{
                    let data = await axios.post('http://localhost:5000/checkAuth',{data:window.localStorage.getItem('session')})
                    setUserData(data.data);
                }
                catch(e){
                    if(window.localStorage.getItem('session')){
                        window.localStorage.removeItem('session');
                    }
                    window.location.href = '/login'
                }
            }
            auth(); 
        }
    },[])

    function optionHandler(data){
        setSelectedField(data);
    }
    return(
        <DashboardContainer>
            <DashboardWrapper>
                <DashboardLeftView>
                    {userData && <UserAccountDetails email={userData.email}>
                        <div className="logo"></div>
                        <div className="data">
                            <span>Hi</span>
                            <p>{userData.email}</p>
                        </div>
                    </UserAccountDetails>}
                    {userData && <UserAccountOptions>
                        <div className="userAcc">
                            <div className="userAccOptTags">
                            <img src="https://img.icons8.com/ios-glyphs/60/233a95/user--v1.png"/>
                            <p>{'Account details'.toUpperCase()}</p>
                            </div>
                            <div className="userAccOptions">
                                <div className="accountDetails" onClick={event=>optionHandler('profileDetails')}>
                                    Profile details
                                </div>
                                <div className="orderDetails" onClick={event=>optionHandler('orderDetails')}>
                                    Orders
                                </div>
                                <div className="addressDetails" onClick={event=>optionHandler('addressDetails')}>Address details</div>
                                <div className="wishlistDetails" onClick={event=>optionHandler('wishlistDetails')}>Wishlist</div>
                            </div>
                        </div>
                    </UserAccountOptions>}
                </DashboardLeftView>
                <DashboardRightView>
                    {selectedField==='profileDetails' &&<AccountDetails setUser={setUserData} data={userData?userData:null}>
                    </AccountDetails> }
                    {selectedField==='orderDetails' &&<OrderDetails data={userData?userData:null}>
                    </OrderDetails> }
                    {selectedField==='addressDetails' &&<AddressDetails setUser={setUserData} addressData={userData?userData.address:null}>
                    </AddressDetails>}
                    {selectedField==='wishlistDetails' &&<AccountDetails setUser={setUserData} data={userData?userData:null}>
                    </AccountDetails>}
                </DashboardRightView>
            </DashboardWrapper>
        </DashboardContainer>
    )
}