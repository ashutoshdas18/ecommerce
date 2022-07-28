import React from "react";
import styled from "styled-components";
import axios from 'axios'
import logo from '../../img/sub.svg'

let RegisterContainer = styled.div`
    // // height:100vh;
    // width:calc(100% - 40px);
    // background-color :#f5f8fb;
    padding: 20px;
`
let RegisterWrapper = styled.div`
    height : max-height;
    width : calc(1200px - 40px);
    background-color :white;
    margin : 0 auto;
    padding :15px 20px;
    border-radius : 5px;
    display:flex;
    .registerDetail{
        width : 60%;
        .registerLabel{
            font-size : 20px;
            font-family :var(--font-secondary);
            font-weight : 500;
            letter-spacing : 0.65px;
            padding-bottom : 15px;
        }
        .registerData>div{
            display:flex;
            flex-direction :column;
            margin-top : 10px;
        }
        .registerData>div>label{
            font-size :13px;
            margin-bottom : 10px;
        }
        .registerData>div>input{
            height :35px;
            width : calc(80% - 10px);
            border : 1px solid #777;
            border-radius : 5px;
            padding-left : 10px;
        }
        .registerData>div>p{
            margin-top :5px;
            color : red;
            font-size : 14px;
        }
        .registerDataAdditional{
            flex-direction : row !important;
            width:80%;
            margin-bottom : 20px;
            &>div{
                display:flex;
                flex-direction : column;
                width : 100%;
            }
            &>div>label{
                font-size : 13px;
                margin-bottom : 10px;
            }
            &>div>input{
                height : 35px;
                width :calc(90% - 10px);
                border : 1px solid #777;
                border-radius : 5px;
                padding-left  :10px;
            }
            &>div>p{
                margin-top :5px;
                color : red;
                font-size : 14px;
            }
            &>div>select{
                height : 40px;
                width :100%;
                background: none;
                border:1px solid #777;
                border-radius :5px;
                padding-left:10px;
            }
        }
        
        .submit{
            height : 40px;
            width : 80%;
            color :white;
            background-color : #233a95;
            text-align : center;
            line-height :40px;
            border-radius :5px;
            font-size : 14px;
            cursor :pointer;
            
        }
    }
    .registerLogo{
        background-image : url('${props=>props.logo}');
        width: 40%;
        background-repeat: no-repeat;
        background-position: center;
    }
    
`

export default function Register(){
    let [signupDetails,setSignupDetails] = React.useState({
        email:'',
        pass:'',
        conf:'',
        mob:'',
        dob:'',
        gender : ''
    })
    let [signUpError,setSignupError] = React.useState({
        emailError:'',
        passError: '',
        confError : '',
        mobError:'',
        dobError:'',
        genderError:''
    })
    function inputChanges(event,data){
        if(signUpError[`${data}Error`]!==''){
            let tempErrorData = {...signUpError};
            tempErrorData[`${data}Error`] = '';
            setSignupError(tempErrorData)
        }
        let tempUserData = {...signupDetails};
        tempUserData[data] = event.target.value;
        setSignupDetails(tempUserData)
    }
    async function submitSignupDetails(){
        for(let input in signupDetails){
            if(signupDetails[input]===''){
                let errors = {...signUpError};
                errors[`${input}Error`] = `${input} should not be empty`;
                setSignupError(errors);
                return;
            }
        }
        if(signupDetails.email.indexOf('@')<0){
            let errors = {...signUpError};
            errors.emailError = 'Please provide a valid email';
            setSignupError(errors);
            return;
        }
        if(signupDetails.pass.length < 5){
            let errors = {...signUpError};
            errors.passError = 'Your password is weak';
            setSignupError(errors);
            return;
        }
        if(signupDetails.pass !== signupDetails.conf){
            let errors = {...signUpError};
            errors.confError = 'Your password should  match';
            setSignupError(errors);
            return;
        }
        if(isNaN(signupDetails.mob)){
            let errors = {...signUpError};
            errors.mobError = 'Mobile number should be a number';
            setSignupError(errors);
            return
        }
        else{
            for(let i in signUpError){
                if(signUpError[i]!=='')
                return
            }
            let test = await axios.post('http://localhost:5000/newUser',{data:signupDetails})
            if(test.data){
                window.location.href="/login"
            }
        }        
    }
    return(
        <RegisterContainer>
            <RegisterWrapper logo={logo}>
                <div className="registerDetail">
                    <div className="registerLabel">REGISTER</div>
                    <div className="registerData">
                        <div className="registerDataEmail">
                            <label>Email</label>
                            <input type='text' onChange={event=>inputChanges(event,'email')}/>
                            {signUpError.emailError!=='' && <p className="emailError">{signUpError.emailError}</p>}
                        </div>
                        <div className="registerDataPassword">
                            <label>Password</label>
                            <input type='password' onChange={event=>inputChanges(event,'pass')}/>
                            {signUpError.passError!=='' && <p className="passError">{signUpError.passError}</p>}
                        </div>
                        <div className="registerDataConfirm">
                            <label>Confirm password</label>
                            <input type='password' onChange={event=>inputChanges(event,'conf')}/>
                            {signUpError.confError!=='' && <p className="confError">{signUpError.confError}</p>}
                        </div>
                        <div className="registerDataMobile">
                            <label>Mobile/Telephone number</label>
                            <input type='text' onChange={event=>inputChanges(event,'mob')}/>
                            {signUpError.mobError!=='' && <p className="mobError">{signUpError.mobError}</p>}
                        </div>
                        <div className="registerDataAdditional">
                            <div className="registerDataDOB">
                                <label>Date of birth</label>
                                <input type='date' onChange={event=>inputChanges(event,'dob')}/>
                                {signUpError.dobError!=='' && <p className="dobError">{signUpError.dobError}</p>}
                            </div>
                            <div className="registerDataGender">
                                <label>Gender</label>
                                <select onChange={event=>inputChanges(event,'gender')}>
                                    <option value="male" >Male</option>
                                    <option value="female" >Female</option>
                                    <option value="others" >Others</option>
                                </select>
                                {signUpError.genderError!=='' && <p className="genderError">{signUpError.genderError}</p>}
                            </div>
                        </div>
                        <div className="submit" onClick={submitSignupDetails}>Submit details</div>
                    </div>
                </div>
                <div className="registerLogo"></div>
            </RegisterWrapper>
        </RegisterContainer>
    )
}