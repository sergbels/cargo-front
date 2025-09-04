import Link from 'next/link';
import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer
            style={{
                backgroundColor: 'var(--surface-variant)',
                color: 'var(--onsurface)',
                padding: '3rem 0',
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--text-base)',
            }}
        >
            <div className="container">
                <div className="row">
                    {/* Колонка 1: Название/Логотип */}
                    <div className="col-xs-12 col-md-4">
                        <div
                            style={{
                                marginBottom: '1.5rem',
                            }}
                        >
                            <Link href="/">
                                <h3
                                    style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: 'var(--text-xl)',
                                        color: 'var(--onbackground)',
                                        margin: 0,
                                    }}
                                >
                                    TransportHub
                                </h3>
                            </Link>
                            <p
                                style={{
                                    color: 'var(--onsurface-variant)',
                                    marginTop: '0.5rem',
                                    lineHeight: 'var(--leading-normal)',
                                }}
                            >
                                Ваш надежный партнер в логистике
                            </p>
                        </div>
                    </div>
                    {/* Колонка 2: Навигация */}
                    <div className="col-xs-12 col-md-4">
                        <div
                            style={{
                                marginBottom: '1.5rem',
                            }}
                        >
                            <h4
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-lg)',
                                    color: 'var(--onbackground)',
                                    marginBottom: '1rem',
                                }}
                            >
                                Навигация
                            </h4>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <Link
                                        href="/"
                                        style={{
                                            color: 'var(--onsurface-variant)',
                                            textDecoration: 'none',
                                            transition: 'var(--transition)',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--onsurface-variant)')}
                                    >
                                        Главная
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <Link
                                        href="/calc"
                                        style={{
                                            color: 'var(--onsurface-variant)',
                                            textDecoration: 'none',
                                            transition: 'var(--transition)',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--onsurface-variant)')}
                                    >
                                        Калькулятор
                                    </Link>
                                </li>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <Link
                                        href="/contacts"
                                        style={{
                                            color: 'var(--onsurface-variant)',
                                            textDecoration: 'none',
                                            transition: 'var(--transition)',
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                                        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--onsurface-variant)')}
                                    >
                                        Контакты
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Колонка 3: Контакты */}
                    <div className="col-xs-12 col-md-4">
                        <div
                            style={{
                                marginBottom: '1.5rem',
                            }}
                        >
                            <h4
                                style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'var(--text-lg)',
                                    color: 'var(--onbackground)',
                                    marginBottom: '1rem',
                                }}
                            >
                                Контакты
                            </h4>
                            <p
                                style={{
                                    color: 'var(--onsurface-variant)',
                                    margin: '0.5rem 0',
                                }}
                            >
                                <a
                                    href="mailto:info@transport.ru"
                                    style={{
                                        color: 'var(--onsurface-variant)',
                                        textDecoration: 'none',
                                        transition: 'var(--transition)',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--onsurface-variant)')}
                                >
                                    info@transport.ru
                                </a>
                            </p>
                            <p
                                style={{
                                    color: 'var(--onsurface-variant)',
                                    margin: '0.5rem 0',
                                }}
                            >
                                <a
                                    href="tel:+79991234567"
                                    style={{
                                        color: 'var(--onsurface-variant)',
                                        textDecoration: 'none',
                                        transition: 'var(--transition)',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--onsurface-variant)')}
                                >
                                    +7 (999) 123-45-67
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderTop: '1px solid var(--border)',
                        paddingTop: '1.5rem',
                        textAlign: 'center',
                        color: 'var(--onsurface-variant)',
                        fontSize: 'var(--text-base)',
                        marginTop: '2rem',
                    }}
                >
                    &copy; {new Date().getFullYear()} TransportHub. Все права защищены.
                </div>
            </div>
        </footer>
    );
};

