import React from "react";
import CategoryCount from "./categoryCount";
import HomeBanner from "./homebanner";
import WeeklyDeals from "./weeklyDeals";

export default function HomePage(){

    return(
        <>
        <HomeBanner></HomeBanner>
        <WeeklyDeals/>
        <CategoryCount></CategoryCount>
        </>
        
    )
}