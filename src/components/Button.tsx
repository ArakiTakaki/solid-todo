import { Component, JSX } from 'solid-js';
import styles from './Button.module.css';

interface ButtonProps {
    onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    width?: string;
};

export const Button: Component<ButtonProps> = ({
    children,
    onClick,
    width
}) => {
    return (
        <button
            class={styles['wrap']}
            onClick={onClick}
            style={{
                width,
            }}
        >
            {children}
        </button>
    )
};
