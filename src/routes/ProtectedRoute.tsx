import {ReactNode, useContext} from "react";
import { Navigate, useLocation } from "react-router";
import { AuthenticationContext } from "../context/AuthenticationContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { state: { isLogged } } = useContext(AuthenticationContext);
    const location = useLocation();

    if (!isLogged) {
        // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion.
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }
    // Sinon, on affiche le composant demandé.
    return children;
}

export default ProtectedRoute;
