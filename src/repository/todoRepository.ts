import { initialTodoStoreValue, Task, Todo, TodoRepository } from "../contexts/TodoContext";
import { notNull } from "./types";

const TODO_LOCAL_STORAGE_KEY = 'todo----00001';

export const localStorageTodoRepository: TodoRepository = {
    save: async (todo) => {
        window.localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todo));
        return todo;
    },
    add: async (task, todo) => {
        return {
            ...todo,
            todoList: [
                ...todo.todoList,
                task,
            ],
        };
    },
    restore: async () => {
        const todo = window.localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
        if (todo == null) return initialTodoStoreValue;
        return (JSON.parse(todo) as Todo);
    },
    edit: async (id, task, todo) => {
        return {
            ...todo,
            todoList: todo.todoList.map(val => {
                if (val.id === id) {
                    return {
                        ...val,
                        ...task,
                    };
                }
                return val;
            })
        }
    },
    delete: async (id, todo) => {
        return {
            ...todo,
            todoList: todo.todoList.map(val => {
                if (val.id === id) {
                    return null;
                }
                return val;
            }).filter(notNull),
        };
    },
};