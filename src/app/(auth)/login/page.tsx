'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import styles from './page.module.css';
import Logo from "@/app/components/Logo/Logo";

const Login = () => {
    const { user, handleUserLogin } = useAuth();
    const [ credentials, setCredentials ] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }

    useEffect(() => {
        if (user) {
            router.push('/room');
        }
    }, [])

    return (
        <main className={styles.login_container}>
            <section className={styles.login}>
                <Logo />
                <div className={styles.login_header}>
                    <h1>Log in</h1>
                    <span>Welcome back! Please enter your details.</span>
                </div>
                    <form className={styles.form_container} onSubmit={(e) => {handleUserLogin(e, credentials)}}>
                        <div className={styles.field_container}>
                            <label className={styles.field_label}>Email:</label>
                            <input
                                className={styles.field}
                                required
                                type="email"
                                name="email"
                                placeholder="Enter your email..."
                                value={credentials.email}
                                onChange={(e) => {handleInputChange(e)}}
                            />
                        </div>

                        <div className={styles.field_container}>
                            <label className={styles.field_label}>Password:</label>
                            <input
                                className={styles.field}
                                required
                                type="password"
                                name="password"
                                placeholder="Enter password..."
                                value={credentials.password}
                                onChange={(e) => {handleInputChange(e)}}
                            />
                        </div>

                        <button
                            className={styles.login_button}
                            type="submit">
                            Login
                        </button>
                    </form>

                    <p className={styles.redirect}>Dont have an account? Register <Link className={styles.link} href="/register">here</Link></p>
            </section>
        </main>
    )
};

export default Login;