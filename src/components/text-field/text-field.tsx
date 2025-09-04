import React, {useState} from 'react';
import {AppComponentProps} from '@/common';
import styles from './component.module.css';

export type TextFieldProps = AppComponentProps & {
    label?: string;
    type?: 'text' | 'password';
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<TextFieldProps> = ({
                                                        label,
                                                        type = 'text',
                                                        value,
                                                        placeholder,
                                                        disabled = false,
                                                        error = false,
                                                        errorMessage,
                                                        sx,
                                                        onChange,
                                                        onBlur,
                                                        onFocus,
                                                    }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : 'text';

    return (
        <div className={`${styles.container} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
             style={sx}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''}`}>
                <input
                    type={inputType}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    className={styles.input}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={handleTogglePassword}
                        disabled={disabled}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
            {error && errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        </div>
    );
};