import { Component } from 'solid-js';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    // onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    children?: never;
    checked?: boolean;
    onChecked: (val :boolean) => void;
};

export const Checkbox: Component<CheckboxProps> = ({
    checked,
    onChecked,
}) => {
    return (
        <label>
            <input
                type='checkbox'
                class={styles['wrap']}
                checked={checked}
                onChange={(e) => {
                    onChecked(e.currentTarget.checked);
                }}
            />
            <span class={styles['check']} />
        </label>
    )
};
