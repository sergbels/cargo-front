import { AppComponentProps } from "@/common";
import styles from "./component.module.css";
import { ReactNode } from "react";

export type CardAction = {
    label: string;
    href?: string;
    onClick?: () => void;
};

export type CardProps = AppComponentProps & {
    title?: string;
    subtitle?: string;
    description?: string;
    actions?: CardAction[];
    children?: ReactNode;
};

export const Card = ({
                         title,
                         subtitle,
                         description,
                         actions,
                         children,
                         sx,
                         className,
                     }: CardProps) => {
    return (
        <div
            className={`${styles.card} ${className || ""}`}
            style={sx}
        >
            <div className={styles.cardContent}>
                {title && <h3 className={styles.cardTitle}>{title}</h3>}
                {subtitle && <h4 className={styles.cardSubtitle}>{subtitle}</h4>}
                {description && <p className={styles.cardDescription}>{description}</p>}
                {children && children}
            </div>
            {actions && actions.length > 0 && (
                <div className={styles.cardActions}>
                    {actions.map((action, index) => (
                        action.href ? (
                            <a
                                key={index}
                                href={action.href}
                                className={styles.cardAction}
                                onClick={action.onClick}
                            >
                                {action.label}
                            </a>
                        ) : (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={styles.cardAction}
                            >
                                {action.label}
                            </button>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};