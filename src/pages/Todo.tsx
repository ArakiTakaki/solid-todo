import { Component, createEffect, createMemo, onMount } from 'solid-js';
import { unwrap } from 'solid-js/store';
import { restoreTodo, RestoreTodoRepository, saveTodo, SaveTodoRepository, useTodoList } from '../usecases/todo';

interface TodoProps {
    restoreRepository: RestoreTodoRepository;
    saveRepository: SaveTodoRepository;
}

export const Todo: Component<TodoProps> = ({
    saveRepository,
    restoreRepository,
}) => {
    const todo = useTodoList()

    onMount(() => {
        restoreTodo(restoreRepository);
    });

    createEffect(() => {
        saveTodo(unwrap(todo))(saveRepository);
        return todo.values.length; // 値の変更が検知されないため、変更される部分を記載する必要がある。
    });

    return (
        <div>
            <p>
                {JSON.stringify(todo)}
            </p>
            <h2>{todo.boardName}</h2>
        </div>
    )
};