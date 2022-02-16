import { Component, JSX } from 'solid-js';
import styles from './Text.module.css';

interface TextProps {
    // onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    width?: string;
    children?: never;
    placeholder?: string;
};

export const Text: Component<TextProps> = ({
    width,
    placeholder
}) => {
    return (
        <input
            type='text'
            class={styles['wrap']}
            placeholder={placeholder}
            style={{
                width,
            }}
        />
    )
};
