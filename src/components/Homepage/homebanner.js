import React from "react";
import styledComponents from "styled-components";
import banner from "../../img/banner1.jpg"

let HomeBannerContainer = styledComponents.div`
    height:550px;
    width:100%;
    img{
        height:100%;
        width:100%;
        object-fit:cover;
    }

`
function HomeBanner(){
    return(
        <HomeBannerContainer>
            <img alt="none" src={banner}/>
        </HomeBannerContainer>
    )
}

export default HomeBanner;