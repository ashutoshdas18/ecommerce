import React from "react";
import styledComponents from "styled-components";
import logo from '../../img/Layer 2.png'
import axios from "axios";

const MidNavContainer = styledComponents.div`
    width:100%;
    height:60px;
    margin-top:30px;
    z-index:1;
`
const MidNavWrapper = styledComponents.div`
width:1200px;
height:100%;
margin: 0  auto;
display:flex;
justify-content:space-between;
`
const MidNavLogo =styledComponents.div`
width:450px;
height:100%;
display:flex;
justify-content:space-between;
img{
    width:165px;
}
`
const MidNavSelectDiv = styledComponents.div`
    width:160px;
    height:60px;
    border:1px solid #d9d9e9;
    border-radius:5px;
    padding-left:20px;
    position:relative;
    cursor:pointer;
    .selectTag{
        font-size:12px;
        padding:12px 0 2px 2px ;
    }
    .selectTagValueContainer{
        display:flex;
        justify-content: space-between;
        align-items:center;
    }
    .selectTagValue{
        color:#233a95;
        font-size: 15px;
        font-weight: bold;
    }
    .selectTagValueContainer>img{
        object-fit:cover;
        height:14px;
        width:14px;
        padding-right:10px;
    }
`
const MidNavSelectHiddenBox  = styledComponents.div`
    height:${props=>props.hiddenStatus?'0':'300px'};
    width:300px;
    padding: 0 20px;
    position:absolute;
    top:65px;
    left:0;
    z-index:2;
    background-color:white;
    transition:200ms ease-in-out;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow-y:${props=>props.hiddenStatus?'hidden':'scroll'};
    

    p{
        padding:10px 0 10px 10px;
        border-bottom:1px solid #e5e7eb;
        font-size:14px;
        cursor:pointer;
    }
    p:hover{
        color:#233a95;
    }
`


const MidNavSearchForm = styledComponents.form`
    
    height:100%;
    display:flex;
    position:relative;
    align-items:center;
    input{
        width:535px;
        padding-left:15px;
        font-size:16px;
        background-color:#f3f4f7;
        color:#232323;
        height:60px;
        border:transparent;
        border-radius:5px;
    }
    .searchImage{
        background-image:url("https://img.icons8.com/glyph-neue/64/000000/search--v1.png");
        position: absolute;
        right: 10px;
        width: 20px;
        height: 20px;
        background-size: cover;
    }
`
const TopNavUserHalf = styledComponents.div`
    width:150px;
    margin-left:20px;
    display:flex;
    justify-content:space-between;
    
    div{
        height:40px;
        width:40px;
        background-size:cover;
    }
    .MidNavAccount{
        background-image:url('https://img.icons8.com/color-glass/48/000000/guest-male.png')
    }
    .MidNavCart{
        background-image:url('https://img.icons8.com/pastel-glyph/64/000000/shopping-trolley--v2.png')
    }
    
`
const TopNavRightHalf = styledComponents.div`
    display:flex;
    height:100%;
    justif-content:space-between;
    align-items:center;
`

export default function MidNav(props){
   let [searchContent,setSearchContent]=React.useState('');
   let [selectValue,setSelectValue]=  React.useState('Odisha') ;
   let [selectDropDown,setSelectDropDown]=React.useState(true);
   async function getSearchQuery(){
        let x = await axios.get(`http://localhost:5000/getSome`);
        // axios.get(`localhost:5000/prodInfo?${searchContent}`);
        console.log(x)
    }

   function searchContentCapture(e){
       setSearchContent(e.target.value);
       if(searchContent.length>=3){
           getSearchQuery();
       }
   }
   function setCurrentState(val){
        setSelectValue(val);
   }
   function revealSelectField(){
       setSelectDropDown(selectDropDown?false:true)
   }
   let languageObject ={};
   if(props.language==="ENG"){
       languageObject={
           lable:"Your Location",
           city1:"Odisha",
           city2:"Mumbai",
           city3:"Delhi",
           searchPlaceHolder:'Search for products...'
       }
   }else{
       languageObject={
        lable:"आपकी स्थिति",
        city1:"ओडिशा",
        city2:"मुंबई",
        city3:"दिल्ली",
        searchPlaceHolder:'उत्पाद खोजें......'
    }
   }
   return(
       <MidNavContainer>
           <MidNavWrapper>
                <MidNavLogo>

                    <div className="MidNavLogoDiv">
                        <img src={logo} alt=""/>
                    </div>
                    <MidNavSelectDiv onClick={revealSelectField}>
                        <p className="selectTag">State</p>
                        <div className="selectTagValueContainer">
                            <p className="selectTagValue">{selectValue}</p>
                            <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/undefined/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png"/>
                        </div>
                        <MidNavSelectHiddenBox hiddenStatus={selectDropDown}>
                            <p onClick={setCurrentState.bind(this,languageObject.city1)}>{languageObject.city1}</p>
                            <p onClick={setCurrentState.bind(this,languageObject.city2)}>{languageObject.city2}</p>
                            <p onClick={setCurrentState.bind(this,languageObject.city3)}>{languageObject.city3}</p>
                        </MidNavSelectHiddenBox>
                    </MidNavSelectDiv>

                </MidNavLogo>
                <TopNavRightHalf>
                <MidNavSearchForm>
                    <input type="text" placeholder="Search for products" onChange={searchContentCapture}/>
                    <div className="searchImage"></div>
                </MidNavSearchForm>
                <TopNavUserHalf>
                    <div className="MidNavAccount"></div>
                    <div className="MidNavPrice"></div>
                    <div className="MidNavCart"></div>
                </TopNavUserHalf>
                </TopNavRightHalf>
           </MidNavWrapper>
       </MidNavContainer>
   )
}