import "./TaskWasNOTFound.scss";

import { useNavigate } from "react-router-dom";

const TaskWasNOTFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="taskWasnotFound">There is no such task</div>
            <button onClick={() => navigate("/")} className="backButton center">
                Go to Main Page
            </button>
        </>
    );
};

export default TaskWasNOTFound;
