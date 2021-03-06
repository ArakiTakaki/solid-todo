import { initialTodoStoreValue, Todo } from "../stores/todo";
import { RestoreTodoRepository, SaveTodoRepository } from "../usecases/todo";

const TODO_LOCAL_STORAGE_KEY = 'todo----00001';

export const localStorageTodoRepository: {
    save: SaveTodoRepository;
    restore: RestoreTodoRepository;
} = {
    save: async (todo: Todo) => {
        window.localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todo));
    },

    restore: async () => {
        const todo = window.localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
        if (todo == null) return initialTodoStoreValue;
        return JSON.parse(todo) as Todo;
    },
};