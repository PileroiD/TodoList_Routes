import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>This page doesn't exist</h1>
            <h2>404</h2>
            <button onClick={() => navigate("/")} className="backButton center">
                Go to main menu
            </button>
        </>
    );
};

export default PageNotFound;
