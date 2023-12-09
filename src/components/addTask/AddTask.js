import { useState } from "react";
import "./AddTask.scss";

const AddTask = (props) => {
    const [text, setText] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        if (text) {
            props.addTask(text);
        }
        setText("");
    };

    const onValueChange = ({ target }) => {
        setText(target.value);
    };

    return (
        <form onSubmit={onSubmit} className="addTask-form">
            <input
                required
                onChange={onValueChange}
                className="addTask-input"
                type="text"
                placeholder="Add a new task"
                value={text}
            />
            <button className="addTask-button" type="submit">
                Add
            </button>
        </form>
    );
};

export default AddTask;
