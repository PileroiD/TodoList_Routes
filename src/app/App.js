import ItemsList from "../components/itemsList/ItemsList";
import Actions from "../components/actions/Actions";
import TodoListService from "../services/TodoListService";

import { useState, useEffect } from "react";
import "./App.scss";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTasksFlag, setUpdateTasksFlag] = useState(false);
    const [wasSearched, setWasSearched] = useState(false);

    const updateTasks = () => setUpdateTasksFlag(!updateTasksFlag);

    const todoListService = new TodoListService();

    useEffect(() => {
        setIsLoading(true);

        todoListService
            .getAllTasks()
            .then((data) => setTasks(data))
            .finally(() => setIsLoading(false));
    }, [updateTasksFlag]);

    const addTask = (text) => {
        setIsLoading(true);

        todoListService.addTask(text).finally(() => {
            setIsLoading(false);
            updateTasks();
        });
    };

    const updateTask = (newtext, taskId) => {
        setIsLoading(true);

        todoListService.updateTask(newtext, taskId).finally(() => {
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

        todoListService.deleteTask(taskId).finally(() => {
            setIsLoading(false);
            updateTasks();
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
