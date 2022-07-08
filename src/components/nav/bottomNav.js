import React from "react";
import styledComponents from "styled-components";
import axios from "axios";
const BottomNavContainer= styledComponents.div`
    width:100%;
    height:60px;
    margin-top:30px;
    position:relative;
    
    `
const BottomNavWrapper = styledComponents.div`
    width:1200px;
    height:60px;
    display:flex;
    justify-content: space-between;
    margin:0 auto;
`
const BottomNavLeftHalf = styledComponents.div`
    width:max-content;
    display:flex;
    flex-directon:column;
   
    .BottomNavSelect{
        width:215px;
        height:50px;
        background-color:#25aee6db;
        color:white;
        border-radius:25px;
        display:flex;
        align-items:center;
        justify-content: space-evenly;
        cursor:pointer;
        img{
            height:16px;
            width:16px;
            object-fit:cover;
        }
        p{
            font-size:15px;
            font-family:var(--font-secondary);
        }
    }
    .BottomNavCategories{
        position:absolute;
        // height:300px;
        height:${props=>props.ishidden?'0px':'400px'};
        width:250px;
        top:58px;
        transition: height 200ms linear;
        cursor:pointer;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color:white;
        border:1px solid #e4e5ee;
        z-index:2;
        overflow-y:${props=>props.isHidden?'hidden':'scroll'};
        border-radius: 0 0 7px 7px;
        .BottomNavCategoriesWrapper{
            margin-top:20px;
            display:flex;
            flex-direction:column;

        }
        .BottomNavCategoriesWrapper>div{
            padding: 10px 0 10px 30px;
            display:flex;
            align-items:center;

        }
        .BottomNavCategoriesWrapper>div>p{
            letter-spacing:.75px;
            font-size:13px;
            color:#3e445a;
        }
        .BottomNavCategoriesWrapper>div>img:first-child{
            height:18px;
            width:18px;
            margin-right:15px;
        }
        .BottomNavCategoriesWrapper>div>img:last-child{
            height:12px;
            width:12px;
            position:absolute;
            right:20px;
        }
    }

`
const BottomNavRightHalf = styledComponents.div`
    width:720px;
    height:100%;
    
    .BottomNavRightHalfContainer{
        display:flex;
        justify-content: space-between;
        align-items:center;
        height:100%;
    }
    .BottomNavRightHalfContainer>div{
        display:flex;
        align-items:center;
        cursor:pointer;
        height:100%;
    }

    .BottomNavRightHalfContainer>div>p{
        font-family:var(--font-secondary);
        margin-right:10px;
    }
    
    .BottomNavRightHalfContainer>div>img{
        height:12px;
        width:12px;
    }
`
const BottomNavFashionReveal=  styledComponents.div`
    height:380px;
    width:100vw;
    background-color:white;
    position:absolute;
    top:55px;
    left:0;
    display:${props=>props.isFashionHidden?'none':'block'};
    opacity:${props=>props.isOpacityHidden ? '0':'1' };
    transform:translateY(${props=>props.isOpacityHidden ? '0':'3px' });
    transition:200ms ease-in-out;
    z-index:3;

    
`
const BottomNavFashionRevealWrapper=  styledComponents.div`
    width: 1200px;
    height: calc(100% - 42px);
    margin: 0 auto;
    padding: 20px 0;
    display:grid;
    grid-template-columns:auto auto auto;
    gap:10px;
    &>div{
    padding:20px 20px;
    height:260px;
    text-align:center;
    }
    &>div>p{
        color:#233a95;
        font-size: 15px;
        font-weight: bold;
        margin-bottom:20px;
        
    }

    
}
`
const BottomNavFashionRevealMen=  styledComponents.div`
    div{
        display:grid;
        grid-template-columns : auto auto;
        gap:10px;
        justify-content:space-evenly;
    }
    div>p{
        font-size:13px;
        color:#3e445a;
        transition:color 200ms ease;
        padding:5px 20px;
        border-radius:25px;
        width:max-content;
    }
    div>p:hover{
        color: #2bbef9;
        background-color:#f0faff;
    }
    
`
const BottomNavFashionRevealWomen=  styledComponents.div`

    div{
        display:grid;
        grid-template-columns : auto auto;
        gap:10px;
        justify-content:space-evenly;
    }
    div>p{
        font-size:13px;
        color:#3e445a;
        transition:color 200ms ease;
        padding:5px 20px;
        border-radius:25px;
        width:max-content;
    }
    div>p:hover{
        color: #2bbef9;
        background-color:#f0faff;
    }
   
`
const BottomNavFashionRevealKids=  styledComponents.div`
    div{
        display:grid;
        grid-template-columns : auto auto;
        gap:10px;
        justify-content:space-evenly;
    }
    div>p{
        font-size:13px;
        color:#3e445a;
        transition:color 200ms ease;
        padding:5px 20px;
        border-radius:25px;
        width:max-content;
    }
    div>p:hover{
        color: #2bbef9;
        background-color:#f0faff;
    }
`


export default function BottomNav(){
    let [isHidden,setHidden]=React.useState(true);
    let [isFashionHidden,setFashionHidden]= React.useState(true);
    let [revealBoxOpacity,setRevealBoxOpacity] = React.useState(true)

    function dummy(){

    }
    function revealBottomNavCats(){
        if(isHidden)
        setHidden(false)
        else setHidden(true)
    }
    function revealFashionBox(){

        if(isFashionHidden){
            setFashionHidden(false);
            setTimeout(function(){
                setRevealBoxOpacity(false)
            },20)
        }else {
            setRevealBoxOpacity(true)
            setTimeout(function(){
                setFashionHidden(true);
            },200)
            
        }

    }

    function collectionClickHandler(args){
        let parentUrl = args.split('-')[0];
        let childUrl = args.split('-')[1];
        window.location.href = `/category/item?type=${childUrl}&q=${parentUrl}`;
    }

    let mensCollection = ["Jeans","Shirts","Vests", "Tshirts","Perfumes", "Hats","Footwear","Accessories"]
    let womensCollection = ["Jeans","Shirts","Vests", "Tshirts","Perfumes", "Hats","Footwear","Accessories"]
    let kidsCollection = ["Jeans","Shirts","Vests", "Tshirts","Perfumes", "Hats","Footwear","Accessories"]
    return(
        <BottomNavContainer>
            <BottomNavWrapper >
                <BottomNavLeftHalf ishidden={isHidden} >
                    <div className="BottomNavSelect" onClick={revealBottomNavCats}>
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/menu--v1.png"/>
                        <p>ALL CATEGORIES</p>
                        <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/ffffff/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png"/>
                    </div>
                    <div className="BottomNavCategories">
                        <div className="BottomNavCategoriesWrapper">
                            <div>
                            <img src="https://img.icons8.com/ios/50/undefined/shirt.png"/>
                            <p>Fashion</p>
                            <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/undefined/external-right-arrows-dreamstale-lineal-dreamstale-3.png"/>
                            </div>
                            <div>
                            <img src="https://img.icons8.com/ios/50/undefined/multiple-devices.png"/>
                            <p>Electronics</p>
                            <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/undefined/external-right-arrows-dreamstale-lineal-dreamstale-3.png"/>
                                </div>
                            <div>
                            <img src="https://img.icons8.com/ios/50/undefined/man-combing-hair.png"/>
                            <p>Grooming</p>
                            </div>
                            <div>
                            <img src="https://img.icons8.com/ios-filled/50/undefined/books.png"/>
                            <p>Books</p>
                            </div>
                            <div>
                                <img src="https://img.icons8.com/ios/50/undefined/office.png"/>
                                <p>Office Supplies</p></div>
                            <div>
                                <img src="https://img.icons8.com/cotton/64/undefined/safety-hat--v3.png"/>
                                <p>Safety Essentials</p></div>
                        </div>
                    </div>
                </BottomNavLeftHalf>
                <BottomNavRightHalf>
                    <div className="BottomNavRightHalfContainer">
                        <div>
                            <p>HOME</p>
                            <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/undefined/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png"/>
                        </div>
                        <div onMouseLeave={isFashionHidden?dummy:revealFashionBox} style={{padding:'0 20px',marginRight:'-20px'}}>
                            <p onMouseEnter={revealFashionBox}>FASHION</p>
                            <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/undefined/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png"/>
                            <BottomNavFashionReveal isFashionHidden={isFashionHidden} isOpacityHidden={revealBoxOpacity} onMouseEnter={dummy}>
                                <BottomNavFashionRevealWrapper>
                                    <BottomNavFashionRevealMen>
                                        <p>Men's Collection</p>
                                        <div className="mensCollectionWrapper">
                                            {mensCollection.map((data,index)=><p key={index} onClick={collectionClickHandler.bind(this,'mens-'+data)}>{data}</p>)}
                                        </div>
                                    </BottomNavFashionRevealMen>
                                    <BottomNavFashionRevealWomen>
                                        <p>Women's Collection</p>
                                        <div className="mensCollectionWrapper">
                                            {womensCollection.map((data,index)=><p key={index} onClick={collectionClickHandler.bind(this,'womens-'+data)}>{data}</p>)}
                                        </div>
                                    </BottomNavFashionRevealWomen>
                                    <BottomNavFashionRevealKids>
                                        <p>Kid's Collection</p>
                                        <div className="mensCollectionWrapper">
                                            {kidsCollection.map((data,index)=><p key={index} onClick={collectionClickHandler.bind(this,'kids-'+data)}>{data}</p>)}
                                        </div>
                                    </BottomNavFashionRevealKids>
                                </BottomNavFashionRevealWrapper>
                            </BottomNavFashionReveal>
                        </div>
                        <div>
                            <p>ELECTRONICS</p>
                            <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/undefined/external-chevron-arrows-tanah-basah-basic-outline-tanah-basah-4.png"/>
                        </div>
                        <div>
                            <p>FOOD</p>
                        </div>
                        <div>
                            <p>APPLIANCES</p>
                        </div>
                        <div>
                            <p>TOYS</p>
                        </div>
                    </div>
                </BottomNavRightHalf>
            </BottomNavWrapper>
            
        </BottomNavContainer>
    )
}
