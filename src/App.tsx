import './App.css'
import Nav from "./components/Nav.tsx"
import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Champions from "./pages/Champions.tsx";
import ChampionItem from "./pages/Champion-Item.tsx";
import React from "react";
import Login from "./pages/Login.tsx";


function App() {

  return (
    <>
        <Nav />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/champions' element={<Champions />} />
            <Route path='/champions/:idChamp' element={<ChampionItem />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </>
  )
}

export default App
