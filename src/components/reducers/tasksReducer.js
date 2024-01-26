import { nanoid } from "nanoid";

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case "SEED": {
            return action.tasks;
        }
        case "CREATE": {
            const newTasks = [
                ...tasks,
                { id: `todo-${nanoid()}`, name: action.name, completed: false },
            ];
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return newTasks;
        }
        case "UPDATE": {
            const newTasks = tasks.map(t =>
                t.id === action.id
                    ? { ...t, name: action.name, completed: action.completed }
                    : t
            );
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return newTasks;
        }
        case "DELETE": {
            const newTasks = tasks.filter(t => t.id !== action.id);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return newTasks;
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
};

export default tasksReducer;
