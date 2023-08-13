import React from 'react';
import { useAuth } from "@/app/hooks/useAuth";
import Link from 'next/link';
import { LogOut, LogIn } from 'react-feather';
import styles from './Header.module.css';
import Logo from "@/app/components/Logo/Logo";

const Header = () => {
    const { user, handleLogout } = useAuth();

    return (
        <header className={styles.header}>
            <Logo className={styles.logo} />
            <p className={styles.username}>{user ? user.name : "Anonymous"}</p>
            <button className={styles.button}>
                {user
                    ? <LogOut onClick={handleLogout}/>
                    : <Link href="/login">
                        <LogIn />
                    </Link>
                }

            </button>
        </header>
    );
};

export default Header;