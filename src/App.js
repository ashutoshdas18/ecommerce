import TopNav from "./components/nav/topNav";
import MidNav from "./components/nav/midNav";
import { useState } from "react";
import BottomNav from "./components/nav/bottomNav";
import Routers from "./route/routes";
// import HomeBanner from "./components/banner/homebanner";
function App() {
    let [isAlive,setAlive] = useState(false);
    let [isDarkAlive,setDarkAlive] = useState(false);
    let [language,setLanguage] = useState('ENG')
    let [darkMode,setDarkMode] = useState(false)
    return(
        <>
        <TopNav isAlive={isAlive} setAlive={setAlive} isDarkAlive={isDarkAlive} setDarkAlive={setDarkAlive} language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <MidNav darkMode={darkMode} language={language}/>
        <BottomNav/>
        <Routers/>
        </>
    )
}

export default App;
