'use client';

import React, {useEffect, useState} from 'react';
import { useAuth } from "@/app/hooks/useAuth";
import Link from 'next/link';
import styles from "./page.module.css";
import Logo from "@/app/components/Logo/Logo";

const Register = () => {
    const [ credentials, setCredentials ] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

    const { handleUserLogin, handleRegister, handleLogout, user } = useAuth();

    useEffect(() => {
        console.log(handleUserLogin, handleRegister, handleLogout, user);
    }, [handleUserLogin, handleRegister, handleLogout, user])

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credentials, [name]:value})
    }

    return (
        <main className={styles.register_container}>
            <section className={styles.register}>
                <Logo />
                <h1 className={styles.register_header}>Sign up</h1>
                <form
                    className={styles.form_container}
                    onSubmit={(e) => {
                        handleRegister(e, credentials)}
                }>
                    <div className={styles.field_container}>
                        <label className={styles.field_label}>Name*</label>
                        <input
                            className={styles.field}
                            required
                            type="text"
                            name="name"
                            value={credentials.name}
                            placeholder="Enter your name..."
                            onChange={(e) => {handleInputChange(e)}}
                        />
                    </div>

                    <div className={styles.field_container}>
                        <label className={styles.field_label}>Email*</label>
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
                        <label className={styles.field_label}>Password*</label>
                        <input
                            className={styles.field}
                            required
                            type="password"
                            name="password1"
                            placeholder="Enter a password..."
                            value={credentials.password1}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                    </div>

                    <div className={styles.field_container}>
                        <label className={styles.field_label}>Confirm password*</label>
                        <input
                            className={styles.field}
                            required
                            type="password"
                            name="password2"
                            placeholder="Confirm your password..."
                            value={credentials.password2}
                            onChange={(e) => {handleInputChange(e)}}
                        />
                    </div>

                    <button
                        className={styles.register_button}
                        type="submit">
                        Register
                    </button>
                </form>

                <p className={styles.redirect}>Already have an account? Login <Link className={styles.link} href="/login">here</Link></p>
            </section>
        </main>
    )
}

export default Register;