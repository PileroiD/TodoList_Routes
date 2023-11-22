import { useState } from "react";
import searchIcon from "../../resorces/search.svg";
import "./SearchItem.scss";

const SearchItem = ({
    searchTask,
    showAllTasks,
    wasSearched,
    setWasSearched,
}) => {
    const [searchText, setSearchText] = useState("");

    const onValueChangeSearch = ({ target }) => {
        setSearchText(target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (searchText && searchText.length < 60) {
            searchTask(searchText);
            setSearchText("");
            setWasSearched(true);
        }
    };

    const onClickShowAllTasks = () => {
        showAllTasks();
        setWasSearched(false);
    };

    return (
        <form onSubmit={onSubmit} className="searchItem">
            <input
                required
                type="text"
                className="searchItem-input"
                placeholder="Search task"
                value={searchText}
                onChange={onValueChangeSearch}
            />
            <button className="searchItem-button" type="submit">
                <img src={searchIcon} alt="searchIcon" />
            </button>
            {wasSearched && (
                <div className="searchItem-showAll">
                    <button
                        onClick={onClickShowAllTasks}
                        className="searchItem-showAll-button"
                    >
                        Show all tasks
                    </button>
                </div>
            )}
        </form>
    );
};

export default SearchItem;
