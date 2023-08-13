import { useContext } from 'react';
import AuthContext from "@/app/contexts/AuthContext";

export const useAuth = () => useContext(AuthContext);