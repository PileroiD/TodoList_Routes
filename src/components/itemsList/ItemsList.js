import { Link } from "react-router-dom";

import "./ItemsList.scss";

const ItemsList = ({ tasks, setChosenTask }) => {
    const tasksList = tasks.map((task) => {
        return (
            <Link key={task.id} to={`task/${task.id}`} className="task-item">
                {task.text.length > 80
                    ? task.text.slice(0, 80) + "..."
                    : task.text}
            </Link>
        );
    });

    return <div className="task-wrapper">{tasksList}</div>;
};

export default ItemsList;
