import ItemsList from "../components/itemsList/ItemsList";
import Actions from "../components/actions/Actions";
import Item from "../components/Item/Item";
import TodoListService from "../services/TodoListService";

import { useState, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";

import "./App.scss";

const PageNotFound = () => {
    return <h1>This page doesn't exist</h1>;
};

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [updateTasksFlag, setUpdateTasksFlag] = useState(false);
    const [wasSearched, setWasSearched] = useState(false);
    const [chosenTask, setChosenTask] = useState(null);

    const updateTasks = () => setUpdateTasksFlag(!updateTasksFlag);

    const params = useParams();
    const navigate = useNavigate();

    const todoListService = new TodoListService();

    useEffect(() => {
        setIsLoading(true);

        todoListService
            .getAllTasks()
            .then((data) => setTasks(data))
            .finally(() => setIsLoading(false));
    }, [updateTasksFlag]);

    useEffect(() => {
        console.log(params);
    }, [params]);

    useEffect(() => {
        const handlePopstate = () => {
            setChosenTask(null);
        };

        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, []);

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
                <Routes>
                    {chosenTask ? (
                        <Route
                            path="task/:id"
                            element={
                                <Item
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    setChosenTask={setChosenTask}
                                />
                            }
                        />
                    ) : (
                        <Route
                            path="/"
                            element={
                                <AppLayout
                                    addTask={addTask}
                                    searchTask={searchTask}
                                    showAllTasks={showAllTasks}
                                    sortTasks={sortTasks}
                                    wasSearched={wasSearched}
                                    setWasSearched={setWasSearched}
                                    isLoading={isLoading}
                                    tasks={tasks}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                    chosenTask={chosenTask}
                                    setChosenTask={setChosenTask}
                                    setIsLoading={setIsLoading}
                                />
                            }
                        />
                    )}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </div>
    );
}

const AppLayout = (props) => {
    const {
        addTask,
        searchTask,
        showAllTasks,
        sortTasks,
        wasSearched,
        setWasSearched,
        isLoading,
        tasks,
        updateTask,
        deleteTask,
        chosenTask,
        setChosenTask,
        setIsLoading,
        setPrevChosenTask,
    } = props;

    return (
        <>
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
                <ItemsList tasks={tasks} setChosenTask={setChosenTask} />
            ) : (
                <div className="noTasks">No tasks</div>
            )}
        </>
    );
};

export default App;
