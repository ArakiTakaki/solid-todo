import { Component } from 'solid-js';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    // onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    children?: never;
};

export const Checkbox: Component<CheckboxProps> = ({
}) => {
    return (
        <label>
            <input
                type='checkbox'
                class={styles['wrap']}
            />
            <span class={styles['check']} />
        </label>
    )
};
