import ItemsList from "../itemsList/ItemsList";

import { useState, useEffect } from "react";
import "./App.scss";

function App() {
    const [tasks, setTasks] = useState([]);
    const [tasksLink, setTasksLInk] = useState(
        "https://jsonplaceholder.typicode.com/todos/"
    );

    useEffect(() => {
        fetch(tasksLink)
            .then((data) => data.json())
            .then((data) => data.slice(0, 20))
            .then((data) => setTasks(data));
    }, [tasksLink]);

    return (
        <div className="app">
            <div className="container">
                <ItemsList tasks={tasks} />
            </div>
        </div>
    );
}

export default App;
