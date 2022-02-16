import { DeepReadonly, produce, unwrap } from "solid-js/store";
import { setTodoStoreState, Task, TaskID, Todo, todoStoreState } from "../stores/Todo"

export type RestoreTodoRepository = () => Todo;
export type SaveTodoRepository = (todo: Todo) => void;

export const restoreTodo = (repository: RestoreTodoRepository) => {
    const todo = repository()
    setTodoStoreState(todo);
};

export const saveTodo = (repository: SaveTodoRepository) => { 
    repository(unwrap(todoStoreState));
};

export const getTodoList = (): DeepReadonly<Todo> => {
    return todoStoreState;
};

export const pushTask = (task: Task) => {
    setTodoStoreState(produce((state) => {
        state.values.push(task);
    }));
};

export const removeTask = (id: TaskID) => {
    setTodoStoreState(produce((state) => {
        const index = state.values.findIndex(val => val.id === id);
        state.values.splice(index, index + 1)
    }));
};

export const toggleTask = (id: TaskID, value?: boolean) => {
    setTodoStoreState(produce((state) => {
        const index = state.values.findIndex(val => val.id === id);
        if (value == null) {
            state.values[index].completed = !state.values[index].completed;
            return;
        }
        state.values[index].completed = value;
    }));
};
