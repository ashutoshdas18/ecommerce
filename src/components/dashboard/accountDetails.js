import React from "react";
import styled from "styled-components";
import axios from 'axios'

let AccountWrapper = styled.div`
    border:1px solid #e3e3e3;
    &>div{
        display:flex;
        flex-direction:column;
        padding:20px;
        
    }
    &>div>div:first-child{
        display:flex;
        margin-bottom:20px;
        p{
            font-size:18px;
            font-weight:500;
            margin-right: 20px;
        }
        span{
            display:flex;
            align-items:center;
            color:#233a95;
            font-size:14px;
            cursor:pointer;
        }
    }
    input{
        height :40px;
        width : 50%;
        padding-left:15px;
        border:${props=>props.inputType?'1px solid #233a95':'none'};
        background-color:${props=>props.inputType?'':'#e3e3e3'};
    }
    .genderInput{
        display:flex;
        &>div{
            display:flex;
            flex-direction:row-reverse;
            align-items:center;
            input{
                height:15px;
                width:15px;
                margin-right:10px;
            }
            label{
                font-size:14px;
                margin-right:10px;
            }
        }
    }
    button{
        height :40px;
        margin-left:20px;
        width:50%;
        background-color : #233a95;
        color:white;
        display:${props=>props.inputType?'block':'none'};
        font-size : 13px;
        line-height:40px;
        text-align:center;
        border:none;
        border-radius:5px;
    }

`

export default function AccountDetails({data,setUser}){
    let[inputType,setInputType]=React.useState(false)
    let[userData,setUserData] = React.useState({
        email:'',
        phone:'',
        gender:''
    })
    React.useEffect(()=>{
        if(data){
            setUserData(data)
        }
    },[data])
    function handleInputChange(event,data){
        let userDataCopy = {...userData};
        userDataCopy[data]=event.target.value;
        setUserData(userDataCopy);
    }
    async function handleUpdate(){
        setInputType(false)
        try{
            let updatedUserData = await axios.post('http://localhost:5000/updateUser',{
                session:window.localStorage.getItem('session'),
                data: userData
            })
            window.localStorage.setItem('session',updatedUserData.data.session);
            setUser(updatedUserData.data);
        }
        catch{

        }
    }
    return(
        <AccountWrapper inputType={inputType}>
            <div className="userEmail">
                <div className="userEmailHeading">
                <p>EMAIL ADDRESS</p>
                <span onClick={event=>setInputType(true)}>Change </span>
                </div>
                <input type="text" onChange={event=>handleInputChange(event,'email')} disabled={inputType?false:true} value={userData.email}/>
            </div>
            <div className="userGender">
                <div className="userGenderHeading">
                <p>GENDER</p>
                </div>
                <div className="genderInput">
                    <div className="male">
                        <label>Male</label>
                        <input type="radio" checked={userData?userData.gender==='male'?true:false:false} onChange={event=>inputType?handleInputChange(event,'gender'):null} value="male"  />
                    </div>
                    <div className="female">
                        <label>Female</label>
                        <input type="radio" checked={userData?userData.gender==='female'?true:false:false} onChange={event=>inputType?handleInputChange(event,'gender'):null} value="female"  />
                    </div>
                    <div className="others">
                    <label>Others</label>
                        <input type="radio" checked={userData?userData.gender==='others'?true:false:false} onChange={event=>inputType?handleInputChange(event,'gender'):null} value="others"  />
                    </div>
                </div>
            </div>
            <div className="userMob">
            <div className="userMobHeading">
                <p>MOBILE NUMBER</p>
                </div>
                <input type="text" onChange={event=>handleInputChange(event,'phone')} disabled={inputType?false:true} value={userData.phone}/>
            </div>
            <button onClick={handleUpdate}>SAVE</button>
        </AccountWrapper>
        
        
    )
}