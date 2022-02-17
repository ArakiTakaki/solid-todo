import { Component } from "solid-js";
import { ID, Task as TaskRepositoryProps, useTodoContext } from "../../contexts/TodoContext";
import { Checkbox } from "../Checkbox";
import { EditableText } from "../EditableText";
import styles from './Task.module.css';

export type TaskProps = TaskRepositoryProps;
export const Task: Component<TaskProps> = (props) => {
    const todo = useTodoContext();

    const handleCheck = async (v: boolean) => {
        await todo.repository.edit(props.id, { completed: v })
        await todo.repository.save();
    }
    const handleEditText = async (v: string) => {
        await todo.repository.edit(props.id, { title: v })
        await todo.repository.save();
    }

    const handleDelete = async () => {
        await todo.repository.delete(props.id);
        await todo.repository.save();
    }

    return (
        <label class={styles.wrap}>
            <Checkbox checked={props.completed} onChecked={handleCheck} />
            <span class={styles.text}>
                <EditableText onChange={handleEditText} strikethrough={props.completed}>
                    {props.title}
                </EditableText>
            </span>
            <span onClick={handleDelete}>(x)</span>
        </label>
    );
}