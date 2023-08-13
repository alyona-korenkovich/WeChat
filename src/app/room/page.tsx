'use client';

import React, { useCallback, useEffect, useState } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '@/appwrite.config';
import {ID, Models, Permission, Query, Role} from 'appwrite';
import { Send, Trash2, Edit3 } from 'react-feather';
import styles from './page.module.css';
import Header from "@/app/components/Header/Header";
import {useAuth} from "@/app/hooks/useAuth";

const Room = () => {
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');
    const { user }: Models.User<Models.Preferences>  = useAuth();

    const getMessages = useCallback(async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderAsc('$createdAt'),
            ]
        );

        setMessages(
            response.documents.sort(
                (a, b) => a.$createdAt - b.$createdAt)
        );
    }, []);

    const deleteMessage = async (id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let payload = {
            user_id: user ? user.$id : '',
            username: user ? user.name : '',
            body: messageBody
        }

        const permissions = user ? [
            Permission.write(Role.user(user.$id)),
        ] : [];

        const promise = databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            permissions,
        );

        promise.then(function (response) {
            setMessageBody('');
        }, function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getMessages();

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, (response) => {
            if (response.events.includes("databases.*.collections.*.documents.*.create")){
                setMessages(prevState => [...prevState, response.payload])
            }

            if (response.events.includes("databases.*.collections.*.documents.*.delete")){
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);


    return (
        <main className={styles.chatRoom_container}>
            <section className={styles.chatRoom}>
                <Header />
                <div className={styles.messages}>
                    {messages.map((message) =>
                        <div key={message.$id} className={styles.message}>
                            <div className={styles.circle} />
                            <div className={styles.message_container}>
                                <div className={styles.message_header}>
                                    <p className={styles.username}>{
                                        message?.username
                                            ? message?.username
                                            : "Anonymous"
                                    }</p>
                                    <p className={styles.timestamp}>{new Date(message.$createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className={styles.body}>{message.body}</p>
                                </div>
                            </div>
                            <div className={styles.messages_buttons}>
                                {
                                    user && message.$permissions.includes(`update(\"user:${user.$id}\")`) && (
                                        <button onClick={() => {
                                            console.log('to be done');
                                        }}>
                                            <Edit3 />
                                        </button>
                                    )
                                }
                                {
                                    user && message.$permissions.includes(`delete(\"user:${user?.$id}\")`) && (
                                        <button onClick={() => {
                                            deleteMessage(message.$id);
                                        }}>
                                            <Trash2 />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
                <form className={styles.textfield_container} onSubmit={handleSubmit}>
                    <textarea
                        className={styles.textfield}
                        required
                        rows="2"
                        placeholder="Напишите сообщение..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSubmit(e);
                            }
                        }}
                        onChange={(e) => {
                            setMessageBody(e.target.value)
                        }}
                        value={messageBody}
                    ></textarea>

                    <button className={styles.sendButton} type="submit">
                        <Send />
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Room;