import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className={styles.heroContent}>
                            <h1 className={styles.heroTitle}>
                                Доставка без хлопот с лучшими транспортными компаниями
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Рассчитайте стоимость доставки за секунды и выберите оптимальный вариант из десятков предложений.
                            </p>
                            <a href={"/calc"}><button className={styles.heroCta}>
                                Рассчитать доставку
                            </button></a>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className={styles.heroImage}>
                            <img
                                src="https://mmamos.ru/wp-content/uploads/2022/04/transportation-and-logistics-of-container.jpg"
                                alt="Логистика и доставка"
                                className={styles.heroImg}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;