import { Component } from 'solid-js';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    // onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    checked?: boolean;
    onChecked?: (val :boolean) => void;
};

export const Checkbox: Component<CheckboxProps> = ({
    checked,
    onChecked,
    children,
}) => {
    return (
        <label>
            <input
                type='checkbox'
                class={styles['wrap']}
                checked={checked}
                onChange={(e) => {
                    onChecked && onChecked(e.currentTarget.checked);
                }}
            />
            <span class={styles['check']} />
            {children}
        </label>
    )
};
