import { Todo } from "../stores/todo";
import { RestoreTodoRepository, SaveTodoRepository } from "../usecases/todo";

const TODO_LOCAL_STORAGE_KEY = 'todo----00001';

export const localStorageTodoRepository: {
    save: SaveTodoRepository;
    restore: RestoreTodoRepository;
} = {
    save: (todo: Todo) => {
        window.localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todo));
    },
    restore: () => {
        const todo = window.localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
        if (todo == null) throw new Error('not restore item');
        return JSON.parse(todo) as Todo;
    },
};