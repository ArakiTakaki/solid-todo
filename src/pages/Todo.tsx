import { Component, createEffect, createMemo, createSignal, For, onMount } from 'solid-js';
import { createStore, unwrap } from 'solid-js/store';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Task } from '../components/todo/Task';
import { createExampleTodo } from '../stores/Todo';
import { pushTask, restoreTodo, RestoreTodoRepository, saveTodo, SaveTodoRepository, useTodoList } from '../usecases/todo';
import styles from './Todo.module.css';

interface TodoProps {
    restoreRepository: RestoreTodoRepository;
    saveRepository: SaveTodoRepository;
}

export const Todo: Component<TodoProps> = ({
    saveRepository,
    restoreRepository,
}) => {
    const todo = useTodoList()
    const [text, setText] = createStore({ value: '' });
    

    onMount(() => {
        restoreTodo(restoreRepository);
    });

    createEffect(() => {
        saveTodo(unwrap(todo))(saveRepository);
        return todo.values.length; // 値の変更が検知されないため、変更される部分を記載する必要がある。
    });

    const handleAddTodo = () => {
        pushTask(text.value);
        setText({
            value: '',
        });
    };

    return (
        <div>
            <h2>{todo.boardName}</h2>
            <div class={styles['input-wrap']}>
                <span class={styles['text']}>
                    <Text value={text.value} placeholder='テキストを入力してください' onChange={(text) => setText({value: text})} />
                </span>
                <span class={styles['add']}>
                    <Button onClick={handleAddTodo}>追加</Button>
                </span>
            </div>
            <ul class={styles.list}>
                <For each={todo.values}>
                    {(value) => (
                        <li class={styles['list-item']}>
                            <Task
                                id={value.id}
                                title={value.title}
                                description={value.description}
                                completed={value.completed}
                                createdAt={value.createdAt}
                                date={value.date}
                                deletedAt={value.deletedAt}
                            />
                        </li>
                    )}
                </For>
            </ul>
        </div>
    )
};