'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header/header';
import { TextField } from '@/components/text-field/text-field';
import { Button } from '@/components/button/button';
import Link from 'next/link';
import styles from '../HeroSection.module.css';

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; password?: string } = {};
        if (!name.trim()) newErrors.name = 'Имя обязательно';
        if (!email.trim()) newErrors.email = 'Email обязателен';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
        if (!password.trim()) newErrors.password = 'Пароль обязателен';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        if (validateForm()) {
            // Здесь будет логика регистрации (API-запрос)
            console.log('Register form submitted:', { name, email, password });
            // Очищаем форму
            setName('');
            setEmail('');
            setPassword('');
            // Можно перенаправить на страницу авторизации
            // router.push('/login');
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
                                <h1 className={styles.heroTitle}>Регистрация</h1>
                                <p className={styles.heroSubtitle}>
                                    Создайте аккаунт для доступа к расчету доставки
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        label="Ваше имя"
                                        error={errors.name != undefined}
                                        errorMessage={errors.name}
                                        sx={{ width: '100%' }}
                                    />
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
                                        Зарегистрироваться
                                    </Button>
                                    <p
                                        style={{
                                            fontFamily: 'var(--font-main)',
                                            fontSize: 'var(--text-base)',
                                            color: 'var(--onsurface-variant)',
                                            marginTop: '1rem',
                                        }}
                                    >
                                        Уже есть аккаунт?{' '}
                                        <Link
                                            href="/login"
                                            style={{
                                                color: 'var(--primary)',
                                                textDecoration: 'none',
                                                transition: 'var(--transition)',
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                                            onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
                                        >
                                            Войти
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

export default RegisterPage;