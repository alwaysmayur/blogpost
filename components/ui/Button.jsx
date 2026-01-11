'use client';
import styles from './Button.module.css';

export default function Button({ children, onClick, className, disabled, type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${className || ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
