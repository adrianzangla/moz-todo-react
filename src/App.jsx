import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect, useReducer } from "react";
import usePrevious from "./hooks/usePrevious";
import tasksReducer from "./components/reducers/tasksReducer";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
];

const App = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [filter, setFilter] = useState("All");

    const listHeadingRef = useRef(null);

    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length < prevTaskLength) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    useEffect(() => {
        dispatch({
            type: "SEED",
            tasks: JSON.parse(localStorage.getItem("tasks")) || DATA,
        });
    }, []);

    const createTask = name => {
        dispatch({ type: "CREATE", name });
    };

    const updateTask = (id, name, completed) => {
        dispatch({ type: "UPDATE", id, name, completed });
    };

    const deleteTask = id => {
        dispatch({ type: "DELETE", id });
    };

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                onUpdate={updateTask}
                onDelete={deleteTask}
            />
        ));

    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form onAdd={createTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>

            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
};

export default App;
