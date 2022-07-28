import styled from "styled-components";

let FilmScreen = styled.div`
    position : absolute;
    height : 100vh;
    width : 100vw;
    background-color : #e3e3e387;
    left:0;
    top:0;
`

export default function Film(){
    function removeFilm(e){
        console.log("Hello")
        e.target.style="display:none;"
    }
    return(
        <FilmScreen onClick={removeFilm}></FilmScreen>
    )
}