import { useEffect, useRef, useState } from "react";
import usePrevious from "../hooks/usePrevious";

const Todo = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.name);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        } else if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    const handleChange = e => {
        setName(e.target.value);
    };

    const handleCancel = () => {
        setName(props.name);
        setIsEditing(false);
    };

    const handleSave = e => {
        e.preventDefault();
        if (name.trim() === "") return;
        props.onUpdate(props.id, name, props.completed);
        setIsEditing(false);
    };

    const handleToggle = () => {
        props.onUpdate(props.id, props.name, props.completed);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleDelete = () => {
        props.onDelete(props.id);
    };

    const editingTemplate = (
        <form className="stack-small">
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    defaultValue={name}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={handleCancel}
                >
                    Cancel
                    <span className="visually-hidden">
                        renaming {props.name}
                    </span>
                </button>
                <button
                    type="submit"
                    className="btn btn__primary todo-edit"
                    onClick={handleSave}
                >
                    Save
                    <span className="visually-hidden">
                        new name for {props.name}
                    </span>
                </button>
            </div>
        </form>
    );
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={handleToggle}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={handleEdit}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={handleDelete}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    );
};

export default Todo;
