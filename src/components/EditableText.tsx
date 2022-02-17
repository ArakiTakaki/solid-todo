import { Component } from 'solid-js';
import styles from './EditableText.module.css';

interface EditableTextProps {
    width?: string;
    children: string;
    placeholder?: string;
    onChange?: (text: string) => void;
    disabled?: boolean;
};

export const EditableText: Component<EditableTextProps> = (props) => {
    return (
        <span>
            <input
                type='text'
                value={props.children}
                class={styles['wrap']}
                onInput={e => {
                    props.onChange && props.onChange(e.currentTarget.value);
                }}
                disabled={props.disabled}
            />
        </span>
    );
};
