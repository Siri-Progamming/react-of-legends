import './App.css'
import Nav from "./components/Nav.tsx"
import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Champions from "./pages/Champions.tsx";
import ChampionItem from "./pages/Champion-Item.tsx";
import Login from "./pages/Login.tsx";
import Inscription from "./pages/Inscription.tsx";
import Page404 from "./pages/Page404.tsx";
import Favoris from "./pages/Favoris.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";


function App() {


  return (
    <>
        <Nav />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/champions' element={<Champions />} />
            <Route path='/champions/:idChamp' element={<ChampionItem />} />
            <Route path='/favoris' element={<ProtectedRoute><Favoris /></ProtectedRoute>} />
            <Route path='/register' element={<Inscription />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Page404 />} />
        </Routes>
    </>
  )
}

export default App
