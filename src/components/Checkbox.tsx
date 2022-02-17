import { Accessor, Component, createMemo } from 'solid-js';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    // onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
    checked?: Accessor<boolean> | boolean;
    onChecked?: (val :boolean) => void;
};

export const Checkbox: Component<CheckboxProps> = ({
    checked,
    onChecked,
    children,
}) => {
    const isChecked = createMemo(() => {
        if (checked == null) return undefined;
        if (typeof checked === 'boolean') return checked;
        return checked();
    });

    return (
        <label class={styles['wrap']}>
            <input
                type='checkbox'
                class={styles['input']}
                checked={isChecked()}
                onChange={(e) => {
                    onChecked && onChecked(e.currentTarget.checked);
                }}
            />
            <span class={styles['check']} />
            {children}
        </label>
    )
};
