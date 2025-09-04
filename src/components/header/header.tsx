import {useState} from "react";
import {IconButton} from "@/components/icon-button/icon-button";
import styles from "./component.module.css";
import Link from "next/link";
import {useRouter} from "next/navigation";

export type NavItem = {
    label: string;
    href: string;
};

export type HeaderProps = {
    navItems?: NavItem[];
    isAuthenticated?: boolean;
    onLoginClick?: () => void;
    onProfileClick?: () => void;
};

export const Header = ({
                           navItems = [
                               {label: "Главная", href: "/"},
                               {label: "Калькулятор", href: "/calc"},
                               {label: "Контакты", href: "/contacts"},
                           ],
                           isAuthenticated = false,
                           onLoginClick,
                           onProfileClick,
                       }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className="row">
                    {/* Logo */}
                    <div className="col-xs-6 col-md-3">
                        <Link href="/" className={styles.logo}>
                            TransportApp
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={`${styles.nav} col-md-6`}>
                        <nav className={styles.navList}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.navItem}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Icon Button (Login/Profile) */}
                    <div className="col-xs-6 col-md-3">
                        <div className={styles.rightActions}>
                            <IconButton
                                onClick={isAuthenticated ? onProfileClick : onLoginClick || (() => router.push("/login"))}
                                sx={{color: "var(--onbackground)"}}
                            >
                                {isAuthenticated ? "👤" : "🔐"}
                            </IconButton>

                            {/* Hamburger Menu Button (Mobile) */}
                            <IconButton
                                onClick={toggleMenu}
                                sx={{color: "var(--onbackground)", display: "none"}}
                                className={styles.hamburger}
                            >
                                ☰
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {isMenuOpen && (
                    <div className={styles.mobileNav}>
                        <nav className={styles.mobileNavList}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.mobileNavItem}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};