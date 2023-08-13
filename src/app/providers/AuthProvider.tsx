'use client';

import { useEffect, useState } from "react";
import { account } from "@/appwrite.config";
import AuthContext from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ID, Models } from "appwrite";

export function AuthProvider({
    children
} : {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<Models.User<Models.Preferences>>(null);
    const router = useRouter();

    useEffect(() => {
        getUserOnLoad();
        console.log('USE EFFECT', user, contextData.handleRegister);
    }, [])

    const getUserOnLoad = async () => {
        try {
            let accountDetails = await account.get();
            setUser(accountDetails);
        } catch(error){ }

        setLoading(false);
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        console.log('CREDS:', credentials)

        try{
            let response = await account.createEmailSession(credentials.email, credentials.password)
            let accountDetails = await account.get();
            setUser(accountDetails)
            router.push('/room');
        }catch(error){
            console.error(error)
        }
    }

    const handleLogout = async () => {
        const response = await account.deleteSession('current');
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        e.preventDefault()
        console.log('Handle Register triggered!', credentials)

        if(credentials.password1 !== credentials.password2){
            alert('Passwords did not match!')
            return
        }

        try {
            let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
            console.log('User registered!', response)

            await account.createEmailSession(credentials.email, credentials.password1)
            let accountDetails = await account.get();
            setUser(accountDetails)
            router.push('/room');
        } catch(error){
            console.error(error)
        }
    }

    const contextData = {
        handleUserLogin,
        handleLogout,
        handleRegister,
        user,
    }

    return(
        <AuthContext.Provider value={ contextData }>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}