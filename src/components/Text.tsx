import { Component, JSX } from 'solid-js';
import styles from './Text.module.css';

interface TextProps {
    value: string;
    width?: string;
    children?: never;
    placeholder?: string;
    onChange?: (text: string) => void;
};

export const Text: Component<TextProps> = ({
    width,
    placeholder,
    onChange,
    value,
}) => {
    return (
        <input
            type='text'
            value={value}
            class={styles['wrap']}
            placeholder={placeholder}
            onInput={e => {
                onChange && onChange(e.currentTarget.value);
            }}
            style={{
                width,
            }}
        />
    )
};
