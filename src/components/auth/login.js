import React from "react";
import styled from "styled-components";
import axios from 'axios'
import ss from '../../img/ss.png'

let LoginWrapper = styled.div`
    width:1200px;
    margin:0 auto;
    border:1px solid #e3e3e3;
    height: 70vh;
    display:flex;
    flex-direction : column;
    margin:top:10px;
`
let LoginForm = styled.form`
    height:400px;
    width:510px;
    border:1px solid #777;
    margin:40px auto 0 auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    &>div{
        display:flex;
        flex-direction:column;
        &>label{
            font-size :14px;
            margin-bottom:10px;
            margin-left:10%;
        }
        &>input{
            height:35px;
            width:80%;
            margin:0 auto 10px auto;
        }
    }
    &>input{
        height: 40px;
        border-radius: 5px;
        width:80%;
        margin:20px auto 30px auto;
        border:none;
        font-size:14px;
        background-color : #233a95;
        color:white;
    }
    span{
        font-size : 14px;
        margin-left:10%;
    }
`

export default function Login(){
    let [loginData,setLoginData]=React.useState({
        email:'',
        pass:''
    })
    let [serverError,setServerError] = React.useState('')

    function handleInputChange(event,data){
        let loginDataCopy = {...loginData};
        loginDataCopy[data] = event.target.value;
        setLoginData(loginDataCopy);
    }
    async function handleLogin(event){
        event.preventDefault();
        let submitData = await axios.post('http://localhost:5000/login',{data:loginData})
        if(submitData.status!==404 && submitData.data){
            window.localStorage.setItem('session',submitData.data)
        }
    }

    return(
        <LoginWrapper>
            {serverError!=='' && <div className="serverError">
                <p>{serverError}</p>
            </div>}
            <LoginForm onSubmit={handleLogin}>
                <div className="loginContainer">
                    <label>E-mail</label>
                    <input type="email" className="loginEmail" onChange={e=>handleInputChange(e,'email')}/>
                </div>
                <div className="passwordContainer">
                    <label>Password</label>
                    <input type="password" className="loginPass" onChange={e=>handleInputChange(e,'pass')} />
                </div>
                 <input type="submit" value="Submit" />
                 <span>Don't have an account ? <a href="/signup">Sign-Up</a> </span>
            </LoginForm>
            <div className="socialIcon">
                <img src={ss} alt=""/>
            </div>
        </LoginWrapper>
    )
}