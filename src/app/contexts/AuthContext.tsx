import { createContext } from "react";
import {Models} from "appwrite";

const AuthContext = createContext<{
    handleUserLogin: (e: any, credentials: any) => Promise<void>,
    handleRegister: (e: any, credentials: any) => Promise<void>,
    handleLogout: () => Promise<void>,
    user: Models.User<Models.Preferences> | undefined,
}>({
    handleUserLogin: async () => undefined,
    handleRegister: async () => undefined,
    handleLogout: async () => undefined,
    user: undefined,
});

export default AuthContext;