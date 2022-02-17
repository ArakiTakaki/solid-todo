import { Component, createMemo } from 'solid-js';
import styles from './EditableText.module.css';

interface EditableTextProps {
    size?: number;
    children: string;
    placeholder?: string;
    onChange?: (text: string) => void;
    disabled?: boolean;
};

export const EditableText: Component<EditableTextProps> = (props) => {
    const computedStyle = createMemo(() => {
        return { width: `${props.size}em` };
    });

    if (props.disabled) return <span class={styles['wrap']} style={computedStyle()} >{props.children}</span>

    return (
        <input
            type='text'
            value={props.children}
            style={computedStyle()}
            classList={{
                [styles['wrap']]: true,
                [styles['edit']]: true,
            }}
            onInput={e => {
                props.onChange && props.onChange(e.currentTarget.value);
            }}
            disabled={props.disabled}
        />
    );
};
