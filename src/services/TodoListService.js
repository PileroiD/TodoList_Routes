class TodoListService {
    _apiBase = "http://localhost:3000/tasks";

    getAllTasks = async () => {
        const res = await fetch(this._apiBase);
        return await res.json();
    };

    addTask = async (text) => {
        const res = await fetch(this._apiBase, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text,
            }),
        });

        return await res.json();
    };

    updateTask = async (newtext, taskId) => {
        const res = await fetch(`${this._apiBase}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                text: newtext,
            }),
        });

        return await res.json();
    };

    deleteTask = async (taskId) => {
        const res = await fetch(`${this._apiBase}/${taskId}`, {
            method: "DELETE",
        });

        return await res.json();
    };
}

export default TodoListService;
