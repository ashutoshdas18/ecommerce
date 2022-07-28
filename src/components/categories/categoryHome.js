import axios from "axios";
import React from "react";
import styled from "styled-components";
import ProductComponent from "../products/productComponent";
import Filter from "./sideFilter";
let CategoryWrapper = styled.div`
    width:1200px;
    margin: 0 auto;
    height:max-content;
    display:flex;
`
let Items = styled.div`
    width : calc(100% - 40px);
    padding : 20px; 
    display : grid;
    grid-template-columns: auto auto auto;

    &>div{
        width : max-content;
        padding : 20px !important;
        height : max-content;
        border:none !important;
    }
    &>div:hover{
        box-shadow: 0 6px 31px -2px rgba(0,0,0,.1);
        transform:translateY(-2px);
    }
`
export default function Category(){
    let [category,setCategory] = React.useState(null);
    let [prodSignal,setSignal] = React.useState({});
    React.useEffect(()=>{
        async function getFilter(url){
            let data = await axios.get(`http://localhost:5000/filters/type${url}`)
            setCategory(data.data);
        }
        if(Object.keys(prodSignal).length>0){
            let url="";
            Object.keys(prodSignal).forEach(e=>{
                url+=e+'=';
                prodSignal[e].forEach((entry,key)=>{
                    if(key === prodSignal[e].length-1){
                        url+=entry+'&'
                    }
                    else
                    url+=entry+'%';
                })
            })
            async function getFilteredItem(){
                let data = await axios.get(`http://localhost:5000/appliedFilters/type?${url}`)
                setCategory(data.data);
            }
            getFilteredItem();
        }
        else
        getFilter(window.location.search);
    },[prodSignal])
    if(category)
    console.log(category.data)
    return(
        <CategoryWrapper>
            <Filter setSignal={setSignal} productSignal={prodSignal} filterData={category?category.filter:null}></Filter>
            <Items>
                {category && <>
                    {category.data.map((product,key)=><ProductComponent data={product} key={key}></ProductComponent>)}
                </>}
            </Items>
        </CategoryWrapper>
    )
}