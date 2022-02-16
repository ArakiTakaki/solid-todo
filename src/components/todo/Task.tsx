import { Component } from "solid-js";
import { Task as TaskRepositoryProps } from "../../stores/Todo";
import { Checkbox } from "../Checkbox";
import styles from './Task.module.css';

export type TaskProps = TaskRepositoryProps;
export const Task: Component<TaskProps> = ({
    title,
    completed,
}) => {
    return (
        <div class={styles.wrap}>
            <label>
                <p>
                    <Checkbox checked={completed} />
                    <span class={styles.text}>
                        {title}
                    </span>
                </p>
            </label>
            {/* TODO 詳細を開くアイコンを追加 */}
        </div>
    );
}