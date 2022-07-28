import React from "react";
import styled from "styled-components";

let SideFilterWrapper = styled.div`
    width:calc(30% - 40px);
    height : max-content;
    padding:20px;
`
let SideFilterLabel = styled.div`

    font-size:16px;
    font-weight:500;
    font-family:var(--font-secondary);
    margin-bottom:15px;

`
let BrandFilter = styled.div`

    .brandLabel{
        font-size:14px;
        font-weight:500;
        font-family:var(--font-secondary);
        margin-bottom:10px;
    }
    .brandInput{
        height:35px;
        background-color:#f3f4f7;
        border:none;
        border-radius:5px;
        padding-left:10px;
        margin-bottom:10px;
    }
    .brands{
        display:flex;
        gap:15px;
        margin-bottom:10px;
        padding-left:5px;
    }
    .brands>p{
        font-size:13px;
        color:#373737;
    }
    .brands>input{
        outline:none;
    }

`

let CategorySpecific = styled.div`
    .filterLabel{
        font-size:14px;
        font-weight:500;
        font-family:var(--font-secondary);
        margin-bottom:10px;
        color : black;
    }
    input{
        outline:none;
        margin-right : 10px;
    }
    &>div{
        margin-bottom:10px;
    }
    &>div>div{
        font-size:14px;
        color:#373737;
        margin-bottom : 5px;
    }
    
`

export default function Filter({ filterData, setSignal, productSignal }) {
    let [brandFilter, setBrandFilter] = React.useState(null);
    React.useEffect(() => {
        if (filterData) {
            let arr = filterData.brands.map(e => e.name)
            setBrandFilter(arr)
        }
    }, [filterData])

    function showFilters(e) {
        let filteredBrand = []
        if (brandFilter) {
            filterData.brands.forEach(brand => {
                if (brand.name.indexOf(e.target.value) === 0) {
                    filteredBrand.push(brand.name)
                }
            })
            setBrandFilter(filteredBrand)
        }
    }
    function filterProducts(filterDataType, filteredData) {

        if (productSignal[filterDataType]) {
            let temp = { ...productSignal }
            if (productSignal[filterDataType].indexOf(filteredData) >= 0) {
                let removeFromFilter = [];
                productSignal[filterDataType].forEach(e => {
                    if (e !== filteredData) {
                        removeFromFilter.push(e)
                    }
                })
                if (removeFromFilter.length === 0) {
                    delete temp[filterDataType]
                }
                else {
                    temp[filterDataType] = removeFromFilter;
                }
                setSignal(temp)
            }
            else {
                temp[filterDataType].push(filteredData)
                setSignal(temp)
            }
        }
        else {
            let x = { ...productSignal };
            x[filterDataType] = [];
            x[filterDataType].push(filteredData)
            setSignal(x)
        }
    }

    return (
        <SideFilterWrapper>
            <SideFilterLabel>
                FILTER PRODUCTS
            </SideFilterLabel>
            <form>
                <BrandFilter>
                    <div className="brandLabel"> BRANDS</div>
                    <input type="text" placeholder="Search for brands" onChange={showFilters} className="brandInput" />
                    {brandFilter && <>
                        {brandFilter.map((e, key) => <div key={key} className="brands">
                            <input type="checkbox" onClick={event => filterProducts('brand', e)} value={e} />
                            <p>{e.toUpperCase()}</p>
                        </div>)
                        }
                    </>}
                </BrandFilter>
                <CategorySpecific>
                    {filterData && <>
                        {Object.keys(filterData.categorySpecific).map((categoryName, key) => <div key={key} className={categoryName}>
                            <div className="filterLabel">{categoryName.toUpperCase()}</div>
                            {filterData.categorySpecific[categoryName].map((e, key) => typeof e !== 'object' ? <div key={key}><input value={e} type='checkbox' onClick={event => filterProducts(categoryName, e)} />{e}</div > : <div key={key} style={{ display: "flex"}} ><input type="checkbox" /><div style={{ display: "flex", gap: "10px" }}>{Object.keys(e).map((objItem, key) => <div key={key}>{e[objItem]}</div>)}</div></div>)}
                        </div>)}
                    </>}

                </CategorySpecific>
            </form>
        </SideFilterWrapper>
    )
}