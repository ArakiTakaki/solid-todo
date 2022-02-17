import { Component } from 'solid-js';
import styles from './Text.module.css';

interface TextProps {
    value: string;
    width?: string;
    children?: never;
    placeholder?: string;
    onChange?: (text: string) => void;
};

export const Text: Component<TextProps> = (props) => {
    return (
        <span>
            <input
                type='text'
                value={props.value}
                class={styles['wrap']}
                placeholder={props.placeholder}
                onInput={e => {
                    props.onChange && props.onChange(e.currentTarget.value);
                }}
                style={{
                    width: props.width,
                }}
            />
        </span>
    )
};
