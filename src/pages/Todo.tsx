import { Component, createSignal, For, onMount } from 'solid-js';
import { v4 } from 'uuid';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Task } from '../components/todo/Task';
import { TodoProvider, useTodoContext } from '../contexts/TodoContext';
import { localStorageTodoRepository } from '../repository/todoRepository';
import styles from './Todo.module.css';

const AddTodo: Component = () => {
    const todo = useTodoContext()
    const [text, setText] = createSignal('');
    const addEvent = async () => {
        await todo.repository.add({
            id: v4(),
            title: text(),
            createdAt: (new Date()).toISOString(),
        })
        setText('');
        await todo.repository.save();
    }
    return (
        <div class={styles['input-wrap']}>
            <span class={styles['text']}>
                <Text width='18em' value={text()} placeholder='テキストを入力してください' onChange={(text) => setText(text)} />
            </span>
            <span class={styles['add']}>
                <Button onClick={addEvent}>追加</Button>
            </span>
        </div>
    )
}

const ListViewr: Component = () => {
    const todo = useTodoContext()
    return (
        <ul class={styles.list}>
            <For each={todo.value.todoList}>
                {(value) => (
                    <li class={styles['list-item']}>
                        <Task
                            {...value}
                        />
                    </li>
                )}
            </For>
        </ul>
    )
}
const BoardTitle: Component = () => {
    const todo = useTodoContext()
    return <h2 class={styles['title']}>{todo.value.boardName}</h2>
}

const TodoView: Component = () => {
    const todo = useTodoContext()
    onMount(() => {
        todo.repository.restore();
    });

    return (
        <>
            <BoardTitle />
            <AddTodo />
            <ListViewr />
        </>
    )
};

export const Todo = () => {
    return (
        <TodoProvider
            id='bar'
            title='hoge'
            repository={localStorageTodoRepository}
        >
            <TodoView />
        </TodoProvider>
    )
}