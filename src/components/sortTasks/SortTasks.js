import "./SortTasks.scss";

const SortTasks = ({ sortTasks }) => {
    return (
        <div className="sortTasks">
            <button onClick={() => sortTasks()} className="sortTasks-button">
                Sort by alphabet
            </button>
        </div>
    );
};

export default SortTasks;
