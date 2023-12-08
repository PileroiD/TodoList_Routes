import { useEffect, useState } from "react";
import iconPencil from "../../resorces/pencil.svg";
import trashBucket from "../../resorces/trash.svg";
import TodoListService from "../../services/TodoListService";

import "./Item.scss";
import { useParams, useNavigate } from "react-router-dom";

const Item = (props) => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [newText, setNewText] = useState("");
    const [wasDeleted, setWasDeleted] = useState(false);

    const navigate = useNavigate();

    const todoListService = new TodoListService();

    useEffect(() => {
        setIsLoading(true);

        todoListService
            .getOneTask(params.id)
            .then((data) => setNewText(data.text))
            .finally(() => setIsLoading(false));
    }, [params]);

    const handleChangeClick = ({ target }) => {
        target.previousElementSibling.focus();
    };

    const onValueChange = ({ target }) => {
        setNewText(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (newText.length > 80) {
            props.updateTask(newText.slice(0, 80) + "...", params.id);
            return;
        }
        props.updateTask(newText, params.id);
    };

    const handleDeleteItem = () => {
        props.deleteTask(params.id);
    };

    const handleGoBack = () => {
        navigate("/");
        props.setChosenTask(null);
    };

    return isLoading ? (
        <div className="loader"></div>
    ) : (
        <>
            <button onClick={handleGoBack}>Go back</button>

            <form onSubmit={onSubmit} className="task-item">
                <input
                    onChange={onValueChange}
                    type="text"
                    className="task-item-input"
                    value={newText}
                />
                <img
                    onClick={handleChangeClick}
                    className="task-item-img"
                    src={iconPencil}
                    alt="pencil-icon"
                />
                <img
                    onClick={handleDeleteItem}
                    className="task-item-img"
                    src={trashBucket}
                    alt="trashBucket-icon"
                />
            </form>
        </>
    );
};

export default Item;
