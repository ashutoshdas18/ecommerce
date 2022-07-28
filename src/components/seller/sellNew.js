import React from "react";
import styled from "styled-components";
import axios from 'axios';

let SellNewContainer = styled.div`
    width : 100%;
    .sellNewHeader{
        height : 60px;
        width : calc(100% - 20px);
        background-color :#FBEACF;
        line-height : 60px;
        letter-spacing : 1.5px;
        padding-left : 20px;
    }
`
let NewProdForm = styled.div`
    display : flex;
    flex-direction : column;
    &>input{
        height : 40px;
        border-radius : 5px;
        border : 1px solid #e3e3e3;
        padding-left : 20px;
        margin : 15px 0;
    }
    &>select{
        height : 40px;
        background:none;
        border : 1px solid #e3e3e3;
        margin-bottom :15px;
        padding : 0 15px;
    }
    .previews{
        margin-bottom : 15px;
        &>div{
            display:flex;
            gap : 30px;
            margin-bottom : 15px;
            &>input{
                height:40px;
                width: calc(30% - 15px);
                padding-left : 15px;
                border:1px solid #e3e3e3;
            }
        }
        button{
            height:40px;
            background:none;
            padding:0 15px;
            border:1px solid #e3e3e3;
        }
    }
    .highlights{
        margin-bottom : 15px;
        &>div{
            display:flex;
            gap : 30px;
            margin-bottom : 15px;
            &>input{
                height:40px;
                width: calc(30% - 15px);
                padding-left : 15px;
                border:1px solid #e3e3e3;
            }
        }
        button{
            height:40px;
            background:none;
            padding:0 15px;
            border:1px solid #e3e3e3;
        }
    }
    .size_and_submit{
        select{
            height : 40px;
            background:none;
            border : 1px solid #e3e3e3;
            margin-right :15px;
            padding : 0 15px;
            width : 200px;
            
        }
        button{
            height:40px;
            background-color : #233a95;
            color : white;
            padding:0 15px;
            border:1px solid #e3e3e3;
            border-radius : 5px;
            width : 170px;
        }
    }
`

export default function SellNew(){
    let[baseCategory,setBaseCategory]= React.useState([]);
    let[categories,setCategories]= React.useState([]);
    let[brands,setBrands]=React.useState([])
    let [previews,setPreviews] = React.useState({
        prev1:'',
        prev2:'',
        prev3:''
    })
    let [highlights,setHighlights] = React.useState({
        high1:'',
        high2:'',
        high3:''
    })
    let [inputData,setInputData]= React.useState({
        prodName:'',
        prodBase:'',
        prodCat:'',
        prodBrand:'',
        prodCurrPrice:'',
        prodReleaseprice:'',
        prodTotalStock:'',
        prodPhoto:'',
        productPreview:[],
        highlights:[],
        sizes:''

    })
    React.useEffect(()=>{
        async function getBaseCategories(){
            let res = await axios.get('http://localhost:5000/products/baseCategory');
            setBaseCategory(res.data)
        }
        getBaseCategories()
    },[])
    
    async function inputChangeHandler(event,data){
        let inputState = {...inputData};
        inputState[data]=event.target.value;
        setInputData(inputState)
        console.log(data)
        if(data ==='prodBase'){
            let categoryData = await axios.get(`http://localhost:5000/products/getCategory?id=${event.target.value}`);
            setCategories(categoryData.data)
        }
        else if(data ==='prodCat'){
            let brandData = await axios.get(`http://localhost:5000/products/getBrands?id=${event.target.value}`);
            setBrands(brandData.data)
        }
        let start_index = Object.keys(inputData).indexOf(data);
        for(let i=start_index+1;i<Object.keys(inputData).length;i++){
            inputState[Object.keys(inputData)[i]]=''
        }
        setInputData(inputState);
        
    }
    async function previewChangeHandler(event,data){
        let preview = {...previews};
        preview[data] = event.target.value;
        setPreviews(preview);
    }
    function submitPreview(){
        let inputState = {...inputData};
        let prevArr = [];
        for(let i in previews){
            if(previews[i].trim()!=='')
            prevArr.push(previews[i])
        }
        inputState.productPreview=prevArr;
        setInputData(inputState)
    }
    function highChangeHandler(event,data){
        let highlight = {...highlights};
        highlight[data] = event.target.value;
        setHighlights(highlight);   
    }
    function submitHigh(){
        let inputState = {...inputData};
        let highArr = [];
        for(let i in highlights){
            if(highlights[i].trim()!=='')
            highArr.push(highlights[i])
        }
        inputState.highlights=highArr;
        setInputData(inputState)
    }
    async function submitProduct(){
        for(let i in inputData){
            if(typeof inputData[i] === String){
                if(inputData[i].trim() === '' ){
                    return;
                }
            }
            else if(typeof inputData[i] === Array){
                if(inputData[i].length===0){
                    return;
                }
            }
        }
        let data = await axios.post('http://localhost:5000/registerNew',{
            data:inputData
        })
    }
    console.log(inputData)
   return(
    <SellNewContainer>
        <div className="sellNewHeader">ADD A NEW PRODUCT</div>
        <div className="newProdBody">
            <NewProdForm>
                <input type="text" placeholder="productName" onChange={event=>inputChangeHandler(event,'prodName')}/>
                <select value={inputData.prodBase} onChange={event=>inputChangeHandler(event,'prodBase')}>
                    <option></option>
                    {baseCategory && baseCategory.map((item,key)=><option key={key} value={item._id}>{item.name}</option>)}
                </select>
                <select value={inputData.prodCat} className="prodCategories" onChange={event=>inputChangeHandler(event,'prodCat')}>
                    <option></option>
                    {categories && categories.map((item,key)=><option key={key} value={item._id}>{item.name}</option>)}
                </select>
                <select value={inputData.prodBrand} className="prodBrands" onChange={event=>inputChangeHandler(event,'prodBrand')}>
                    <option></option>
                    {brands && brands.map((item,key)=><option key={key} value={item._id}>{item.name}</option>)}
                </select>
                <input type="text" value={inputData.prodCurrPrice} placeholder="Current price" onChange={event=>inputChangeHandler(event,'prodCurrPrice')}/>
                <input type="text" value={inputData.prodReleaseprice} placeholder="Release price" onChange={event=>inputChangeHandler(event,'prodReleaseprice')}/>
                <input type="text" value={inputData.prodTotalStock} placeholder="Total Stock" onChange={event=>inputChangeHandler(event,'prodTotalStock')}/>
                <input type="text" placeholder="Poduct Photo (drop a link)" onChange={event=>inputChangeHandler(event,'prodPhoto')}/>
                <div className="previews">
                <div className="previewInputs">
                    <input type="text" placeholder="preview1" onChange={event=>previewChangeHandler(event,'prev1')}/>
                    <input type="text" placeholder="preview2" onChange={event=>previewChangeHandler(event,'prev2')}/>
                    <input type="text" placeholder="preview3" onChange={event=>previewChangeHandler(event,'prev3')}/>
                </div>
                
                <button onClick={submitPreview}>Add Previews</button>
                </div>
                <div className="highlights">
                <div className="highlightsDetails">
                    <input type="text" placeholder="Highlights1" onChange={event=>highChangeHandler(event,'high1')}/>
                    <input type="text" placeholder="Highlights2" onChange={event=>highChangeHandler(event,'high2')}/>
                    <input type="text" placeholder="Highlights3" onChange={event=>highChangeHandler(event,'high3')}/>
                </div>
                <button onClick={submitHigh}>Add Previews</button>
                </div>
                <div className="size_and_submit">
                <select value={inputData.sizes} className="prodSIzes" onChange={event=>inputChangeHandler(event,'sizes')}>
                    <option disabled={true}></option>
                    <option value="FREE_SIZE">FREE SIZE</option>
                </select>
                <button onClick={submitProduct}> SUBMIT </button>
                </div>
            </NewProdForm>
        </div>
    </SellNewContainer>
    
   )

}