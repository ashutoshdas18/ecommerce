import React from "react";
import styled from "styled-components";
import axios from "axios";

let CategoryWrapper = styled.div`
    height : 280px;
    padding: 20px;
    width : calc(1200px - 40px);
    margin:0 auto;
    display:grid;
    grid-template-columns : auto auto auto auto auto;
    &>div{
        border : 1px solid #e3e3e3;
        display:flex;
        flex-direction : column;
        justify-content : center;
        align-items :center;
    }
    &>div:first-child{
        grid-row : 1/3
    }
`

export default function CategoryCount(){
    let [items,setItems] = React.useState(null);
    React.useEffect(()=>{
        async function getItems(){
            let res = await axios.get('http://localhost:5000/getCategotyCount')
            if(res.data){
                setItems(res.data)
            }
        }
        getItems();
    },[])
    return(
        <CategoryWrapper>
            {items && Object.keys(items).map((item,key)=><div key={key}>
                <p>{item}</p>
                <p>{items[item]}</p>
            </div>)}
        </CategoryWrapper>
    )
}