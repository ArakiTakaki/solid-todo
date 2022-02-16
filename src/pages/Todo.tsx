import { Component, createEffect, createMemo, For, onMount } from 'solid-js';
import { unwrap } from 'solid-js/store';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Task } from '../components/todo/Task';
import { createExampleTodo } from '../stores/Todo';
import { pushTask, restoreTodo, RestoreTodoRepository, saveTodo, SaveTodoRepository, useTodoList } from '../usecases/todo';

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

    const handleMockTodo = () => {
        const task = createExampleTodo();
        console.log(task)
        pushTask(task.title, {
            ...task,
            completed: Math.round(Math.random()) === 1,
        });
    };

    return (
        <div>
            <h2>{todo.boardName}</h2>
            <Text placeholder='テキストを入力してください'/>
            <Button onClick={handleMockTodo}>
                追加
            </Button>
            <For each={todo.values}>
                {(value) => (
                    <Task 
                        id={value.id} 
                        title={value.title}
                        description={value.description}
                        completed={value.completed}
                        createdAt={value.createdAt}
                        date={value.date}
                        deletedAt={value.deletedAt}
                    />
                )}
            </For>
        </div>
    )
};