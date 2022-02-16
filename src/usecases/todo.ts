import { DeepReadonly, produce, unwrap } from "solid-js/store";
import { setTodoStoreState, Task, TaskID, Todo, todoStoreState } from "../stores/Todo"

export type RestoreTodoRepository = () => Promise<Todo>;
export type SaveTodoRepository = (todo: Todo) => Promise<void>;

export const restoreTodo = async (repository: RestoreTodoRepository) => {
    const todo = await repository()
    setTodoStoreState(todo);
};

export const saveTodo = (todo: Todo) => async (repository: SaveTodoRepository) => { 
    await repository(todo);
};

export const useTodoList = (): DeepReadonly<Todo> => {
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
