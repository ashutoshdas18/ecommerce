import React from "react";
import styledComponents from "styled-components";
import axios from "axios";
import ProductComponent from "../products/productComponent";

let WeeklyDealsContainer= styledComponents.div `
    width:1200px;
    height:780px;
    padding: 20px 0;
    margin:20px auto;
    display:flex;
    justify-content:space-between;
    .regularDeals{
        height:95%;
        width:60%;
        border-radius:8px;
        display:grid;
        grid-template-columns:auto auto auto;
        &>div{
            height:340px;
            // border-collapse:collapse;
        }
        &>div:hover{
            box-shadow: 0 6px 31px -2px rgba(0,0,0,.1);
        }
        &>div:first-child{
            border-radius:5px 0 0 0;
            border-right:0;
            border-bottom:0;
        }
        div:nth-child(3){
            border-radius:0 5px 0 0;
            border-left:0;
            border-bottom:0;
        }
        div:nth-child(4){
            border-radius:0 0 0 5px;
            border-right:0;
        }
        div:nth-child(5){
            border-top:0;
        }
        div:nth-child(6){
            border-radius:0 0 5px 0;
            border-left:0;
        }
    }

`
let HighLightDeal = styledComponents.div`
    height:calc(95% - 40px);
    width:calc(30% - 40px);
    border:2px solid #d51243;
    border-radius:8px;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .highLightDealHeader>p{
            font-size: 20px;
            color: #233a95;
            margin: 10px 0 10px 5px;
    }
    .highLightDealCounter{
        display:flex;
        align-items:center;
        div{
            height:48px;
            width:48px;
            background-color:#ed174a;
            border-radius:5px;
            color:white;
            font-family:var(--font-secondary);
            font-size: 20px;
            line-height: 48px;
            text-align: center;
            margin: 0 5px;
        }
    }
    .highLightDealBody{
        height:300px;
        width:100%;
        padding-top:80px;
        text-align:center;
        position:relative;
        img{
            height:300px;
            width:200px;
            object-fit:contain;
        }
        &:after{
            content:'${props=>props.discount?props.discount+'%':""}';
            position:absolute;
            left:0;
            top:40px;
            height:60px;
            width:60px;
            border-radius:50%;
            background-color:#ed174a;
            color:white;
            font-family:var(--font-secondary);
            font-size: 22px;
            text-align:center;
            line-height:60px;
            font-weight:600;
        }
    }


`

const HighLightDealFooter = styledComponents.div`
    height:100%;
    padding-left:15px;
    margin-top:30px;
    .highlightProductName{
        font-size:18px;
        font-weight:500;
    }
    .highlightBrandName{
        font-size:14px;
        color:#9e9ea5;
    }
    .highLightAvailability{
        font-size:14px;
        letter-space:0.75px;
        color:${props=>props.available==='A'?'#00b853':props.available==='N'?'#d51243':''};
        margin-top:10px;
        font-family:var(--font-secondary);
        font-weight:500;
    }
    &>div{
        display:flex;
        margin-top:10px;
    }
    &>div>p:first-child{
        color :#a8a8b5;
        margin-right:10px;
    }
`

export default function WeeklyDeals(){
    let [weeklyData,setWeeklyData] = React.useState(null);
    React.useEffect(()=>{
        async function getWeeklyData(){
            let data = await axios.get('http://localhost:5000/weeklyData');
            setWeeklyData(data.data);
        }
        getWeeklyData();
    },[])
    let discount;
    if(weeklyData){
        let currPrice = parseInt(weeklyData[0].currPrice)
        let releasePrice=parseInt(weeklyData[0].releasePrice)
        discount = releasePrice-currPrice>0?Math.ceil(((releasePrice-currPrice)/releasePrice)*100):0;
    }
    return(
        <WeeklyDealsContainer>
            <HighLightDeal discount={discount?discount:null}>
                <div className="highLightDealHeader">
                    <p>Deals of the <strong>week!</strong></p>
                    <div className="highLightDealCounter">
                        <div className="counterHour">03</div>:
                        <div className="counterMinute">20</div>:
                        <div className="counterSecond">40</div>
                    </div>
                </div>
                <div className="highLightDealBody">
                    <img src={weeklyData?weeklyData[0].photo:''} alt="no-img"/>

                </div>
                <HighLightDealFooter available={weeklyData ? weeklyData[0].currStock>0 ?'A':'N':null }>
                    <p className="highlightProductName">{weeklyData?weeklyData[0].name:''}</p>
                    <p className="highlightBrandName">{weeklyData?weeklyData[0].brand:''}</p>
                    <p className="highLightAvailability">{weeklyData ? weeklyData[0].currStock>0?'AVAILABLE':'NOT AVAILABLE':''}</p>
                    <div className="highlightPriceDifferncee">
                        <p className="highLightOldPrice"><s>&#8377;{weeklyData?weeklyData[0].releasePrice:''}</s></p>
                        <p className="highLightNewPrice">&#8377;{weeklyData?weeklyData[0].currPrice:''}</p>
                    </div>
                </HighLightDealFooter>
            </HighLightDeal>
            <div className="regularDeals">
                <ProductComponent data ={weeklyData?weeklyData[1]:null}></ProductComponent>
                <ProductComponent data ={weeklyData?weeklyData[2]:null}></ProductComponent>
                <ProductComponent data ={weeklyData?weeklyData[3]:null}></ProductComponent>
                <ProductComponent data ={weeklyData?weeklyData[4]:null}></ProductComponent>
                <ProductComponent data ={weeklyData?weeklyData[5]:null}></ProductComponent>
                <ProductComponent data ={weeklyData?weeklyData[6]:null}></ProductComponent>
            </div>
        </WeeklyDealsContainer>
    )
}