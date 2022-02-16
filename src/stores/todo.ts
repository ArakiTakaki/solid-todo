import { createContext } from 'solid-js';
import { createStore } from 'solid-js/store'
import { ISODate } from '../interfaces/common';

export type TaskID = number | string

export interface Task {
    id: TaskID;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: ISODate;
    date: ISODate;
    deletedAt: ISODate | null;
}

export interface Todo {
    id: number | string;
    boardName: string;
    values: Task[];
}

export const createExampleTodo = (): Task => {
    return {
        id: Math.random(),
        title: `サンプルTODO ${Math.floor(Math.random() * 1000)}`,
        description: null,
        completed: false,
        createdAt: (new Date()).toISOString(),
        date: (new Date()).toISOString(),
        deletedAt: (new Date()).toISOString(),
    };
};

export const initialTodoStoreValue: Todo = {
    id: 0,
    boardName: 'example board',
    values: [],
}

const [state, setState] = createStore<Todo>(initialTodoStoreValue);

export const todoStoreState = state;
export const setTodoStoreState = setState;
