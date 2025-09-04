import React from 'react';
import styles from './component.module.css';
import {AppComponentProps} from '@/common';

export interface DeliveryCardProps extends AppComponentProps {
    logo: string;
    name: string;
    deliveryDate: string;
    price: number;
    isBestPrice?: boolean;
    isBestDate?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({
    logo,
    name,
    deliveryDate,
    price,
    isBestPrice,
    isBestDate,
    onClick,
    sx,
}) => {
    return (
        <div
            className={`${styles.card} ${isBestPrice || isBestDate ? styles.bestOption : ''}`}
            onClick={onClick}
            style={sx}
        >
            <div className={styles.logoContainer}>
                <img src={logo} alt={`${name} logo`} className={styles.logo} />
            </div>
            <div className={styles.content}>
                <div className={styles.nameContainer}>
                    <h3 className={styles.name}>{name}</h3>
                    <div className={styles.badgeContainer}>
                        {isBestPrice && (
                            <span className={`${styles.badge} ${styles.bestPrice}`}>
                                Лучшая цена
                            </span>
                        )}
                        {isBestDate && (
                            <span className={`${styles.badge} ${styles.bestDate}`}>
                                Самая быстрая
                            </span>
                        )}
                    </div>
                </div>
                <p className={`${styles.detail} ${styles.deliveryDate}`}>
                    <span className={styles.label}>Дата доставки:</span> {deliveryDate}
                </p>
                <p className={`${styles.detail} ${styles.price}`}>
                    <span className={styles.label}>Стоимость:</span> {price.toFixed(2)} ₽
                </p>
            </div>
        </div>
    );
};