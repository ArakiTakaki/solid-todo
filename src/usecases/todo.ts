import { DeepReadonly, produce, unwrap } from "solid-js/store";
import { setTodoStoreState, Task, TaskID, Todo, todoStoreState } from "../stores/Todo"
import { v4 } from 'uuid';

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

export const pushTask = (
    title: string, 
    {
        id = v4(),
        description = null,
        completed = false,
        createdAt = (new Date()).toISOString(),
        date = null,
        deletedAt = null,
    }: Partial<Omit<Task, 'title'>> = {}
    ) => {
    setTodoStoreState(produce((state) => {
        state.values.push({
            id,
            title,
            description,
            completed,
            createdAt,
            date,
            deletedAt
        });
    }));
};

export const updateTask = (id: TaskID, task: Partial<Omit<Task, 'id'>>) => {
    setTodoStoreState(produce((state) => {
        const idx = state.values.findIndex(val => val.id === id);
        if (idx === -1) return;
        state.values[idx] = {
            ...state.values[idx],
            ...task
        };
    }));
};

export const removeTask = (id: TaskID) => {
    setTodoStoreState(produce((state) => {
        const index = state.values.findIndex(val => val.id === id);
        state.values.splice(index, 1)
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
