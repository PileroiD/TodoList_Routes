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
    const [inFocus, setInFocus] = useState(false);
    const [taskWasDeleted, setTaskWasDeleted] = useState(false);

    const navigate = useNavigate();

    const todoListService = new TodoListService();

    useEffect(() => {
        setIsLoading(true);

        if (!taskWasDeleted) {
            todoListService
                .getOneTask(params.id)
                .then((data) => {
                    if (Object.keys(data).length !== 0) {
                        setNewText(data.text);
                        return;
                    } else {
                        navigate("/taskIsNotFound");
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            console.log("task wasn't loaded");
        }
    }, [params, taskWasDeleted]);

    useEffect(() => {
        window.addEventListener("click", ({ target }) => {
            if (target.className !== "task-item-input") {
                setInFocus(false);
            }
        });

        return window.removeEventListener("click", ({ target }) => {
            if (target.className !== "task-item-input") {
                setInFocus(false);
            }
        });
    }, []);

    const handleChangeClick = ({ target }) => {
        target.previousElementSibling.focus();
        setInFocus(true);
    };

    const onValueChange = ({ target }) => {
        setNewText(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (newText.length > 80) {
            props.updateTask(newText, params.id);
            return;
        }
        props.updateTask(newText, params.id);
    };

    const handleDeleteItem = () => {
        props.deleteTask(params.id);
        setTaskWasDeleted(true);
    };

    const handleGoBack = () => {
        navigate("/");
    };

    const handleFocusInput = () => {
        setInFocus(true);
    };

    const manageValueShowing = () => {
        if (newText) {
            if (inFocus) {
                return newText;
            } else {
                if (newText.length > 80) {
                    return newText.slice(0, 80) + "...";
                }
                return newText;
            }
        }
    };

    return isLoading ? (
        <div className="loader"></div>
    ) : (
        <>
            <button className="backButton" onClick={handleGoBack}>
                Go back
            </button>

            {taskWasDeleted ? (
                <div className="deletedMessage">This task was deleted</div>
            ) : (
                <form onSubmit={onSubmit} className="task-item">
                    <textarea
                        onChange={onValueChange}
                        type="text"
                        className="task-item-input"
                        value={manageValueShowing()}
                        onClick={handleFocusInput}
                        wrap="soft"
                    />
                    {inFocus ? (
                        <button
                            onClick={onSubmit}
                            type="submit"
                            className="task-item-submitBtn"
                        >
                            Submit
                        </button>
                    ) : (
                        <>
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
                        </>
                    )}
                </form>
            )}
        </>
    );
};

export default Item;
