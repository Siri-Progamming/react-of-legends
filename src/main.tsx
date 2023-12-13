import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import {AuthenticationProvider} from "./context/AuthenticationProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
 //<React.StrictMode>
    <AuthenticationProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </AuthenticationProvider>
 //</React.StrictMode>,
)
