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
    function filterProducts(filteredData) {
        if (productSignal.includes(filteredData)) {
            let newArr = [];
            productSignal.forEach(e => {
                if (e !== filteredData) {
                    newArr.push(e);
                }
            })
            setSignal(newArr)
        }
        else {
            let newArr = productSignal.map(e => e);
            newArr.push(filteredData);
            setSignal(newArr)
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
                            <input type="checkbox" onClick={event => filterProducts(e)} value={e} />
                            <p>{e.toUpperCase()}</p>
                        </div>)
                        }
                    </>}
                </BrandFilter>
            </form>
        </SideFilterWrapper>
    )
}