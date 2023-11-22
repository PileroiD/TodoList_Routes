import ItemsList from "../itemsList/ItemsList";
import Actions from "../actions/Actions";

import { useState, useEffect } from "react";
import "./App.scss";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTasksFlag, setUpdateTasksFlag] = useState(false);
    const [wasSearched, setWasSearched] = useState(false);

    const updateTasks = () => setUpdateTasksFlag(!updateTasksFlag);

    useEffect(() => {
        setIsLoading(true);

        fetch("http://localhost:3000/tasks")
            .then((data) => data.json())
            .then((data) => setTasks(data))
            .finally(() => setIsLoading(false));
    }, [updateTasksFlag]);

    const addTask = (text) => {
        setIsLoading(true);

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text,
            }),
        }).finally(() => {
            setIsLoading(false);
            updateTasks();
        });
    };

    const updateTask = (newtext, taskId) => {
        setIsLoading(true);

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text: newtext,
            }),
        })
            .then((data) => data.json())
            .finally(() => {
                setIsLoading(false);
                updateTasks();
                setWasSearched(false);
            });
    };

    const searchTask = (searchingText) => {
        let newTasks = tasks
            .map((item) => {
                if (
                    item.text
                        .toLowerCase()
                        .includes(searchingText.toLowerCase())
                ) {
                    return item;
                }
            })
            .filter((item) => item !== undefined);

        setTasks(newTasks);
    };

    const deleteTask = (taskId) => {
        setIsLoading(true);

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE",
        })
            .then((data) => data.json())
            .finally(() => {
                setIsLoading(false);
                updateTask();
                setWasSearched(false);
            });
    };

    const showAllTasks = () => {
        updateTasks();
    };

    const sortTasks = () => {
        const tasksCopy = [...tasks];

        const sortedTasks = tasksCopy.sort((a, b) => {
            const textA = a.text.toLowerCase();
            const textB = b.text.toLowerCase();

            if (textA < textB) {
                return -1;
            } else if (textA > textB) {
                return 1;
            } else {
                return 0;
            }
        });

        setTasks(sortedTasks);
    };

    return (
        <div className="app">
            <div className="container">
                <Actions
                    addTask={addTask}
                    searchTask={searchTask}
                    showAllTasks={showAllTasks}
                    sortTasks={sortTasks}
                    wasSearched={wasSearched}
                    setWasSearched={setWasSearched}
                />
                {isLoading ? (
                    <div className="loader"></div>
                ) : tasks.length ? (
                    <ItemsList
                        updateTask={updateTask}
                        tasks={tasks}
                        deleteTask={deleteTask}
                    />
                ) : (
                    <div className="noTasks">No tasks</div>
                )}
            </div>
        </div>
    );
}

export default App;
