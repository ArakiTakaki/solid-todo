import { Component } from "solid-js";
import { Task as TaskRepositoryProps } from "../../stores/Todo";
import { removeTask, updateTask } from "../../usecases/todo";
import { Checkbox } from "../Checkbox";
import { EditableText } from "../EditableText";
import styles from './Task.module.css';

export type TaskProps = TaskRepositoryProps;
export const Task: Component<TaskProps> = (props) => {
    return (
        <div class={styles.wrap}>
            <label>
                <p>
                    <Checkbox checked={props.completed} onChecked={(e) => updateTask(props.id, { completed: e })} />
                    <span class={styles.text}>
                        <EditableText>
                            {props.title}
                        </EditableText>
                    </span>
                    <span onClick={() => removeTask(props.id)}>(x)</span>
                </p>
            </label>
        </div>
    );
}