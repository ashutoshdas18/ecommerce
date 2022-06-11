import {React,useState} from "react";
import styledComponents from "styled-components";
import {Typography } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const TopNavContainer = styledComponents.div`
width:100%;
height:40px;
border-bottom:1px solid #e3e3e3;
background-color:${props=>props.color};
color:${props=>props.textColor};
`
const TopNavWrapper = styledComponents.div`
width:1200px;
height:100%;
display:flex;
margin:0 auto;
align-items: center;
justify-content: space-between;
position:relative;
`
const TopNavLeft = styledComponents.div`
width:810px;
display:flex;
justify-content:space-between;
align-items:center;
.topNavLeftUL{
    width:300px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.topNavLeftUL>li{
    list-style:none;
}
.topNavLeftUL>li>a{
    color: ${props=>props.color};
    text-decoration:none;
    font-size:12px;
}
.topNavLeftUL>li>a:hover {
    color: #2bbef9;
}
`
const TopNavLeftContent = styledComponents.div`
display:flex;
.topNavLeftContentImage{
    margin-right:10px;
}
`
const TopNavSpanSeparator=styledComponents.span`
background-color:#e3e3e3;
height:20px;
width:1px;
`

const TopNavRight = styledComponents.div`
width:330px;
height:100%;
display:flex;
align-items:center;
justify-content:space-between;
span{
    height:100%;
    width:1px;
    background-color:#e3e3e3;
}
`
const TapNaVRightLeftHalf = styledComponents.div`
width:max-content;
font-size:12px;
h4{
    display:inline;
}
`
const TopNavRightRightHalf=styledComponents.div`
display:flex;
height:100%;
align-items:center;
justify-content:space-between;
div{
    font-size:12px;
    color:#3e445a;
    display:flex;
    align-items:center;
    cursor:pointer;
}
`
const DropDown = styledComponents.div`
    height:100px;
    width:100px;
    position:absolute;
    top:${props=>props.top}px;
    opacity:${props=>props.opacity};
    background-color:white;
    transition:200ms all;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius:5px;
    z-index:3;
    ul{
        height:100%;
        width:100%;
        display:flex;  
        flex-direction:column;
        align-items:center;
        justify-content:center;
    }
    ul>li{
        list-style:none;
        font-size:14px;
        width:100%;
        text-align:center;
        :hover{
            background-color:#e3e3e3;
        }
    }
`
function TopNav(props){
    let [opacity,setOpacity]=useState(0);
    let [top,setTop]=useState(0)
    function mouseEnter(){
        if(arguments[0]==='lang'){
            if(!props.isAlive){
            props.setAlive(true)
            }
            setOpacity(0);
            setTop(35);
            setTimeout(function(){
                setOpacity(1);
                setTop(40);
    
            },100)
        }
        else if(arguments[0]==='darkMode'){
            if(!props.isDarkAlive){
                props.setDarkAlive(true)
                }
                setOpacity(0);
                setTop(35);
                setTimeout(function(){
                    setOpacity(1);
                    setTop(40);
        
                },100)
        }
        
    } 
    function mouseLeave(){
        if(props.isAlive)
        {
            setOpacity(0);
            setTop(0);
            props.setAlive(false)
            
        }
        else if(props.isDarkAlive){
            setOpacity(0);
            setTop(0);
            props.setDarkAlive(false)
        }

        
    }  
    function languageSet(lang){
        props.setLanguage(arguments[0])
    }
    function setDark(){
        if(arguments[0]==="Dark")
        {
            props.setDarkMode(true)
            document.body.style.backgroundColor="#232325";
        }
        else
        {
            props.setDarkMode(false);
            document.body.style.backgroundColor="white";
        }
        

    }
    let navContentObj;
    if(props.language==="ENG"){
        navContentObj=['About Us','My account','Orders','Wishlist','100% Secure delivery without contacting the courier','Need help? Call Us:','ENG']
    }else{
        navContentObj=['हमारे बारे में', 'मेरा खाता', 'आदेश', 'विशलिस्ट', 'कूरियर से संपर्क किए बिना 100% सुरक्षित डिलीवरी', 'सहायता चाहिए? हमें कॉल करें:', 'हिंदी']
    }
    return(
        <TopNavContainer color={props.darkMode?'#232325':'white'} textColor={props.darkMode?'white !important':'black'}>
            <TopNavWrapper>
                <TopNavLeft color={props.darkMode?'white':'#3e445a'}>
                    <ul className="topNavLeftUL">
                        <li><a  href="#!">{navContentObj[0]}</a></li>
                        <li><a  href="#!">{navContentObj[1]}</a></li>
                        <li><a  href="#!">{navContentObj[2]}</a></li>
                        <li><a  href="#!">{navContentObj[3]}</a></li>
                    </ul>
                    <TopNavLeftContent>
                        <AssignmentTurnedInIcon className="topNavLeftContentImage"></AssignmentTurnedInIcon>
                        <Typography variant="subtitle1" className="topNavContentPara" style={{color:'#3e445a',fontSize:'12px'}}>{navContentObj[4]}</Typography>
                    </TopNavLeftContent>
                </TopNavLeft>
                <TopNavSpanSeparator></TopNavSpanSeparator>
                <TopNavRight>
                    <TapNaVRightLeftHalf> {navContentObj[5]}<h4 style={{color:'#2bbef9'}}> + 0020 500</h4></TapNaVRightLeftHalf>
                    <span></span>
                    <TopNavRightRightHalf>
                        <div onMouseEnter={mouseEnter.bind(this,'lang')} onMouseLeave={mouseLeave.bind(this,'lang')} style={{height:'100%',lineHeight:'40px'}}>{navContentObj[6]}<ArrowDropDownIcon/>
                        {props.isAlive&&<DropDown opacity={opacity} top={top}>
                            <ul>
                                <li onClick={languageSet.bind(this,'ENG')}>English</li>
                                <li onClick={languageSet.bind(this,'HIN')}>हिन्दी</li>
                            </ul>
                            </DropDown>}</div>
                        <div onMouseEnter={mouseEnter.bind(this,'darkMode')} onMouseLeave={mouseLeave.bind(this,'darkMode')} style={{height:'100%',lineHeight:'40px'}}>{props.darkMode ? 'Dark':'Light'}<ArrowDropDownIcon/>
                        {props.isDarkAlive&&<DropDown opacity={opacity} top={top}>
                            <ul>
                                <li onClick={setDark.bind(this,'Dark')}>DARK</li>
                                <li onClick={setDark.bind(this,'Light')}>LIGHT</li>
                            </ul>
                            </DropDown>}
                        </div>
                    </TopNavRightRightHalf>
                </TopNavRight>
            </TopNavWrapper>
        </TopNavContainer>
    )
}
export default TopNav;