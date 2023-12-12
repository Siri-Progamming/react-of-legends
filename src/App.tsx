import './App.css'
import Nav from "./components/Nav.tsx"
import Home from "./components/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Champions from "./components/Champions.tsx";
import ChampionItem from "./components/Champion-Item.tsx";


function App() {

  return (
    <>
        <Nav />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/champions' element={<Champions />} />
            <Route path='/champions/:idChamp' element={<ChampionItem />} />
        </Routes>
    </>
  )
}

export default App
