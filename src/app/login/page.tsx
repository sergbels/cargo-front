'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { TextField } from '@/components/text-field/text-field';
import { Button } from '@/components/button/button';
import Link from 'next/link';
import styles from '../HeroSection.module.css';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!email.trim()) newErrors.email = 'Email обязателен';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
        if (!password.trim()) newErrors.password = 'Пароль обязателен';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        if (validateForm()) {
            // Здесь будет логика авторизации (API-запрос)
            console.log('Login form submitted:', { email, password });
            // Очищаем форму
            setEmail('');
            setPassword('');
            // Можно перенаправить на главную страницу
            // router.push('/');
        }
    };

    return (
        <>
            <Header />
            <section className={styles.heroSection} style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            <div
                                className={styles.heroContent}
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderRadius: 'var(--bradius)',
                                    boxShadow: 'var(--shadow)',
                                    padding: '2rem',
                                    textAlign: 'center',
                                }}
                            >
                                <h1 className={styles.heroTitle}>Вход</h1>
                                <p className={styles.heroSubtitle}>
                                    Войдите в аккаунт для доступа к расчету доставки
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        error={errors.email != undefined}
                                        errorMessage={errors.email}
                                        sx={{ width: '100%' }}
                                    />
                                    <TextField
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Пароль"
                                        type="password"
                                        error={errors.password != undefined}
                                        errorMessage={errors.password}
                                        sx={{ width: '100%' }}
                                    />
                                    <Button onClick={onSubmit} sx={{ width: '100%', marginTop: '1rem' }}>
                                        Войти
                                    </Button>
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-main)',
                                            fontSize: 'var(--text-base)',
                                            color: 'var(--onsurface-variant)',
                                            marginTop: '1rem',
                                        }}
                                    >
                                        Нет аккаунта?{' '}
                                        <Link
                                            href="/register"
                                            style={{
                                                color: 'var(--primary)',
                                                textDecoration: 'none',
                                                transition: 'var(--transition)',
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                        >
                                            Зарегистрироваться
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginPage;