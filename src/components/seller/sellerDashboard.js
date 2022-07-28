import React from "react";
import styled from "styled-components";
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from "axios";
Chart.register(...registerables);

let DashboardContainer = styled.div`
    width : 70%;
`
let DashboardContainerTop = styled.div`
    width : 100%;
    height : 400px;
    display : flex;
    .chartContainer{
        width : 70%;
        height :max-content;
        border : 1px solid #e3e3e3;
        border-radius : 5px;
        padding :15px;

        .highlights{
            display:flex;
            gap:30px;
            margin-top:15px;
            &>div{
                height : 80px;
                width : 200px;
                border : 1px solid #e3e3e3;
                border-radius : 5px;
                display : flex;
                align-items :center;
                justify-content : space-evenly;
                img{
                    height : 40px;
                    width : 40px
                }
                p:first-child{
                    font-size  :14px;
                    margin-bottom : 5px;
                }
                p:last-child{
                    font-size  :14px;
                    font-weight :500;
                }
            }
        }
    }
`
let DashboardContainerBottom= styled.div`
    width : calc(75% - 40px);
    .ordersHeader{
        display:flex;
        gap : 30px;
        p{
            cursor : pointer;
        }
    }
    .orderHeaderBorder{
        height:1px;
        width:100%;
        margin-top : 15px;
        background-color : #e3e3e3;
        display:flex;
        align-items:center;
        .borderSlider{
            height:3px;
            width : 110px;
            background-color : #233a95;
            transition : 200ms;
            transform:translateX(${props=>props.translate})
        }
        margin-bottom:15px;
    }


`
let OrderList = styled.div`
    display:flex;
    justify-content:space-between;
    padding:20px;
    border : 1px solid #e3e3e3;
    &>div{
        display:flex;
        gap:20px;
        .orderUserLogo{
            background: ${props=>props.userName?`url('https://avatars.dicebear.com/api/bottts/${props.userName}.svg')`:'#e3e3e3'};
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background-size:contain;
        }
        &>div>p:first-child{
            font-size:13px;
            color : #777;
        }
        &>div>p:last-child{
            font-size: 14px;
            font-weight : 500;
        }
    }
`

export default function SellerDashboard(){
    let [dataSet,setDataSet]=React.useState('');
    let [transition,setTransistion] = React.useState(0)
    let [orders,setOrders] = React.useState({})
    React.useEffect(()=>{
        async function getSeller(){
            let res = await axios.post('http://localhost:5000/getSellerData');
            setDataSet(res.data)
        }
        getSeller();
        loadActive();
    },[])
    async function loadActive(){
        setTransistion('0');
        let res = await axios.get('http://localhost:5000/getActiveOrders')
        setOrders(res.data)
    }
    function loadOrders(){
        setTransistion('130px')
    }
    return(
        <DashboardContainer>
            <DashboardContainerTop>
                <div className="chartContainer">
                  <p>Products & Earnings</p>  
                  <div className="highlights">
                    <div className="totalProds">
                    <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-products-sustainable-living-flaticons-flat-flat-icons.png"/>
                    <div>
                        <p>Total Products</p>
                        <p>{dataSet.totalProducts}</p>
                    </div>
                    </div>
                    <div className="totalEarning">
                    <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-earning-investing-flaticons-lineal-color-flat-icons.png"/>
                    <div>
                        <p>Total Earnings</p>
                        <p>{dataSet.price}</p>
                    </div>
                    </div>
                    <div className="totalUnavialbleProds">
                    <img src="https://img.icons8.com/fluency/48/000000/out-of-stock.png"/>
                    <div>
                        <p>Total Unavialble</p>
                        <p>{dataSet.totalUnavailableProducts}</p>
                    </div>
                    </div>
                  </div>
                <div className="BarContainer">
                <Bar
                datasetIdKey='id'
                data={{
                    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    datasets: [
                    {
                        id: 1,
                        label: '',
                        data: dataSet?dataSet.dataSet:null,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                    },
                    ],
                }}
                height={200}
                width={300}
                options={{
                    maintainAspectRatio:false,
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                  size: 14,
                                }
                            }
                        },
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 2,
                            ticks: {
                                font: {
                                  size: 14,
                                }
                            }
                        }
                    }
                    
                }}
                />
                </div>
                </div>
                <div className="sellerBanner"></div>
            </DashboardContainerTop>
            <DashboardContainerBottom translate={transition}>
                <div className="ordersHeader">
                    <p onClick={event=>loadActive(0)}>Active Orders</p> 
                    <p onClick={event=>loadOrders(130)}>Total Orders</p> 
                </div>
                <div className="orderHeaderBorder">
                    <span className="borderSlider"></span>
                </div>
                {transition==='0' && orders.orders && orders.orders.map((item,key)=><OrderList userName={item.email} key={key}>
                <div className="orderUserLogo">
                    <div className="orderUserLogo"></div>
                    <div className="orderUserMail">
                    <p>Email</p>
                    <p>{item.email}</p>
                    </div>
                </div>
                <div className="orderPriceAndDate">
                <div className="orderPrice">
                    <p>Price</p>
                    <p>{orders.user[key].currPrice}</p>
                </div>
                <div className="orderDate">
                <p>Date</p>
                <p>{item.date}</p>
                </div>
                </div>
                <div></div>
                </OrderList>)
                }
            </DashboardContainerBottom>
        </DashboardContainer>
    )
}