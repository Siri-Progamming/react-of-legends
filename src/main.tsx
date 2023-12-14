import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {AuthenticationProvider} from "./context/AuthenticationProvider.tsx";
import ChampionsProvider from "./context/ChampionsProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
 //<React.StrictMode>
    <ChampionsProvider>
        <AuthenticationProvider>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
        </AuthenticationProvider>
    </ChampionsProvider>
 //</React.StrictMode>,
)
