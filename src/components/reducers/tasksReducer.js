import { nanoid } from "nanoid";

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case "CREATE": {
            return [
                ...tasks,
                { id: `todo-${nanoid()}`, name: action.name, completed: false },
            ];
        }
        case "UPDATE": {
            return tasks.map(t =>
                t.id === action.id
                    ? { ...t, name: action.name, completed: action.completed }
                    : t
            );
        }
        case "DELETE": {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error(`Unknown action: ${action.type}`);
        }
    }
};

export default tasksReducer;
