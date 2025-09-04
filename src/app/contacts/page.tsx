'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Header} from '@/components/header/header';
import {TextField} from '@/components/text-field/text-field';
import {Button} from '@/components/button/button';
import styles from '../HeroSection.module.css';
import {Footer} from "@/components/footer/footer";

const ContactPage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; message?: string } = {};
        if (!name.trim()) newErrors.name = 'Имя обязательно';
        if (!email.trim()) newErrors.email = 'Email обязателен';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Некорректный email';
        if (!message.trim()) newErrors.message = 'Сообщение обязательно';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = () => {
        if (validateForm()) {
            // Здесь будет логика отправки формы (например, API-запрос)
            console.log('Form submitted:', {name, email, message});
            // Очищаем форму после отправки
            setName('');
            setEmail('');
            setMessage('');
            // Можно перенаправить на страницу благодарности
            // router.push('/thank-you');
        }
    };

    return (
        <>
            <Header/>
            <section className={styles.heroSection} style={{padding: '3rem 0'}}>
                <div className="container">
                    <div className="row" style={{justifyContent: 'center'}}>
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
                                <h1 className={styles.heroTitle}>Свяжитесь с нами</h1>
                                <p className={styles.heroSubtitle}>
                                    Задайте вопрос или оставьте заявку, и мы ответим в кратчайшие сроки
                                </p>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%'}}>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        label="Ваше имя"
                                        error={errors.name != undefined}
                                        errorMessage={errors.name}
                                        sx={{width: '100%'}}
                                    />
                                    <TextField
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email"
                                        error={errors.email!= undefined}
                                        errorMessage={errors.email}
                                        sx={{width: '100%'}}
                                    />
                                    <TextField
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        label="Сообщение"
                                        error={errors.message!= undefined}
                                        errorMessage={errors.message}
                                        sx={{width: '100%'}}
                                    />
                                    <Button onClick={onSubmit} sx={{width: '100%', marginTop: '1rem'}}>
                                        Отправить
                                    </Button>
                                </div>
                            </div>
                            <div
                                style={{
                                    marginTop: '2rem',
                                    backgroundColor: 'var(--surface-variant)',
                                    borderRadius: 'var(--bradius)',
                                    boxShadow: 'var(--shadow)',
                                    padding: '2rem',
                                    textAlign: 'center',
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'var(--text-xl)',
                                        color: 'var(--onbackground)',
                                        marginBottom: '1.5rem',
                                    }}
                                >
                                    Контактная информация
                                </h2>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-main)',
                                        fontSize: 'var(--text-base)',
                                        color: 'var(--onsurface-variant)',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Email: <a href="mailto:info@transport.ru">info@transport.ru</a>
                                </p>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-main)',
                                        fontSize: 'var(--text-base)',
                                        color: 'var(--onsurface-variant)',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Телефон: <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                                </p>
                                <p
                                    style={{
                                        fontFamily: 'var(--font-main)',
                                        fontSize: 'var(--text-base)',
                                        color: 'var(--onsurface-variant)',
                                    }}
                                >
                                    Адрес: г. Москва, ул. Транспортная, д. 10
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default ContactPage;