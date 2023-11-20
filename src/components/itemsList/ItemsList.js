import Item from "../Item/Item";

import "./ItemsList.scss";

const ItemsList = ({ tasks }) => {
    const tasksList = tasks.map((task) => {
        return <Item {...task} />;
    });

    return <ul className="task-wrapper">{tasksList}</ul>;
};

export default ItemsList;
