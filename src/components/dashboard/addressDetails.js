import React from "react";
import styled from "styled-components";
import axios from 'axios'
import LocComponent from "../../img/loc";

let AddressWrapper = styled.div`
    .addressHeader{
        padding:20px;
        font-size:18px;
        font-weight:500;
    }
    .addNew{
        display:flex;
        flex-direction:row;
        align-items:center;
        color:#3498db;
        font-size : 14px;
        padding:20px;
        border:1px solid #e3e3e3;
        cursor:pointer;
        display:${props=>props.item?'none':'flex'};
        img{
            height:15px;
            width:15px;
            object-fit:contain;
            margin-right:10px;
        }
    }
`;
let NewAddress = styled.div`
    border: 1px solid #e3e3e3;
    padding: 20px 0 20px 20px;
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
    button{
        height : 40px;
        width:calc(100% - 40px);
        background-color : #233a95;
        color:white;
        border:none;
        margin-top:10px;
    }
`
let EmptyAddress = styled.div`
    margin-top : 20px;
    height : 400px;
    border:1px solid #e3e3e3;
    position:relative;
    .noAddress{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        display : flex;
        flex-direction:column;
        align-items:center;
        svg{
            margin-bottom:20px;
        }
        p{
            font-size:14px;
        }
    }
`
let AddressListWrapper = styled.div`
    height:max-content;
    margin-top:20px;
    border:1px solid #e3e3e3;
    .topPart{
        font-size :14px;
        font-weight: 500;
        margin-bottom:10px;
    }
    .bottomPart{
        font-size : 13px;
    }
    div{
        border-bottom:1px solid #e3e3e3;
        padding:10px;
    }

`
export default function AddressDetails({addressData}){
    let [revealNewAdrdress,setRevealNewAdrdress] = React.useState(false);
    let [error,setError] = React.useState(false)
    let [addresses,setAddresses] = React.useState(addressData)
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
                    session:window.localStorage.getItem('session'),
                    data:userDetails
                })
                if(res.data){
                    console.log(res.data)
                    setRevealNewAdrdress(false)
                    setAddresses(res.data)

                }
            }
        

    }
    function addressChange(event,data){
        let currAddress = {...userDetails};
        currAddress[data] = event.target.value;
        setUserDetails(currAddress);
    }
    return(
        <AddressWrapper item={revealNewAdrdress}>
            <p className="addressHeader">MANAGE ADDRESSES</p>
            {!revealNewAdrdress && <div className="addNew" onClick={event=>setRevealNewAdrdress(true)}><img src="https://img.icons8.com/android/48/3498db/plus.png"/>ADD A NEW ADDRESS</div>}
            {revealNewAdrdress && <NewAddress>
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
                    <button onClick={handleNewAddress}>Add address</button>
            </NewAddress>}
            {addresses.length<=0 && <EmptyAddress>
                <div className="noAddress">
                    <LocComponent></LocComponent>
                    <p>Address is not available, please add addresses</p>
                </div>
                
            </EmptyAddress>}
            {addresses.length>0 &&<AddressListWrapper>
                    {addresses.map((item,key)=>
                    <div className="addressContainer" key={key}>
                        <p className="topPart">{JSON.parse(item).name}&nbsp;&nbsp;&nbsp;&nbsp; +91{JSON.parse(item).number}</p>
                        <p className="bottomPart">{JSON.parse(item).addOne},{JSON.parse(item).city},{JSON.parse(item).state}</p>
                        <p className="bottomPart" style={{fontWeight:'500'}}>{JSON.parse(item).pin}</p>
                    </div>)}</AddressListWrapper> }
        </AddressWrapper>
    )
}