import React from 'react';
import { AppComponentProps } from '@/common';
import styles from './component.module.css';

export type ButtonProps = AppComponentProps & {
    variant?: 'primary' | 'secondary' | 'text';
    disabled?: boolean;
    inProgress?: boolean;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  disabled = false,
                                                  inProgress = false,
                                                  children,
                                                  sx,
                                                  ...props
                                              }) => {
    return (
        <button
            className={`
        ${styles.button}
        ${styles[variant]}
        ${disabled ? styles.disabled : ''}
        ${inProgress ? styles.inProgress : ''}
      `}
            style={sx}
            disabled={disabled || inProgress}
            {...props}
        >
            {inProgress && (
                <span className={styles.loader}></span>
            )}
            <span className={styles.content}>{children}</span>
        </button>
    );
};