import { Component, createContext, createSignal, useContext } from 'solid-js';
import { createStore, DeepReadonly, produce } from 'solid-js/store';
import { ISODate } from '../interfaces/common';

export type ID = number | string
export interface Task {
    id: ID;
    title: string;
    createdAt: ISODate;
    description?: string;
    completed?: boolean;
    date?: ISODate;
    deletedAt?: ISODate;
}

export interface Todo {
    id: ID;
    boardName: string;
    todoList: DeepReadonly<Task[]>;
}

export type SaveTodoRepository = (todo: Todo) => Promise<Todo>;
export type RestoreTodoRepository = () => Promise<Todo>;
export type AddTodoRepository = (task: Task, todo: Todo) => Promise<Todo>;
export type EditTodoRepository = (id: ID, task: Partial<Omit<Task, 'id'>>, todo: Todo) => Promise<Todo>;
export type DeleteTodoRepository = (id: ID, todo: Todo) => Promise<Todo>;

export type TodoRepository = {
    save: SaveTodoRepository;
    restore: RestoreTodoRepository;
    add: AddTodoRepository;
    edit: EditTodoRepository;
    delete: DeleteTodoRepository;
};


interface TodoProviderValue {
    value: Todo;
    repository: {
        save: () => Promise<void>;
        restore: () => Promise<void>;
        add: (task: Task) => Promise<void>;
        edit: (id: ID, task: Partial<Omit<Task, 'id'>>) => Promise<void>;
        delete: (id: ID) => Promise<void>;
    };
}

export const initialTodoStoreValue: Todo = {
    id: 0,
    boardName: 'example board',
    todoList: [],
}

type TodoProvider = {
    value: Todo;
    usecase: {
        save: () => {}
    };
};

const todoContext = createContext<TodoProviderValue>({
    value: {
        boardName: '',
        id: '',
        todoList: [],
    },
    repository: {
        delete: () => {
            throw new Error('');
        },
        save: () => {
            throw new Error('');
        },
        add: () => {
            throw new Error('');
        },
        edit: () => {
            throw new Error('');
        },
        restore: () => {
            throw new Error('');
        },
    },
});

export const useTodoContext = () => useContext(todoContext);
export const TodoProvider: Component<{
    id: ID;
    title: string;
    repository: TodoRepository;
}> = (props) => {
    const [todo, setTodo] = createStore<Todo>({
        boardName: props.title,
        id: props.id,
        todoList: [],
    });

    return (
        <todoContext.Provider value={{
            value: todo,
            repository: {
                save: async () => {
                    await props.repository.save(todo);
                },
                delete: async (id: ID) => {
                    const result = await props.repository.delete(id, todo);
                    setTodo(result);
                },
                add: async (task) => {
                    const result = await props.repository.add(task, todo);
                    setTodo(result);
                },
                edit: async (id, task) => {
                    const result = await props.repository.edit(id, task, todo);
                    setTodo(result);
                },
                restore: async () => {
                    const result = await props.repository.restore();
                    setTodo(result);
                },
            },
        }}>
            {props.children}
        </todoContext.Provider>
    );
};
