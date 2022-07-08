import axios from "axios";
import React from "react";
import styled from "styled-components";
import Filter from "./sideFilter";
let CategoryWrapper = styled.div`
    width:1200px;
    margin: 0 auto;
    height:max-content;
    display:flex;
`
export default function Category(){
    let [category,setCategory] = React.useState(null);
    let [prodSignal,setSignal] = React.useState([]);
    React.useEffect(()=>{
        async function getFilter(url){
            let data = await axios.get(`http://localhost:5000/filters/type${url}`)
            setCategory(data.data);
        }
        if(prodSignal.length>0){
            console.log("Hello")
        }
        else
        getFilter(window.location.search);
    },[prodSignal])
    return(
        <CategoryWrapper>
            <Filter setSignal={setSignal} productSignal={prodSignal} filterData={category?category.filter:null}></Filter>
        </CategoryWrapper>
    )
}