import "./Item.scss";

const Item = ({ id, title }) => {
    return (
        <li className="task-item">
            {id}. {title}
        </li>
    );
};

export default Item;
