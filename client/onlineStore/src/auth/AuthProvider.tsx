import React, { useContext, createContext, useState, useEffect } from "react";
import type {AuthResponse} from "../types/types.ts";

interface AuthProviderProps{
    children: React.ReactNode;
}
const AuthContext =  createContext({
    isAuthenticated: false,
    getToken: ()=> {},
    saveUser: (userData: AuthResponse) => {},
})

export function AuthProvider ({children}: AuthProviderProps){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>( null )
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken){
            setIsAuthenticated(true)
            setToken(storedToken);
        }
    },[]);


    function getToken(){
        return token
    }

    function saveUser(userData: AuthResponse){
        setToken(userData.token);
        localStorage.setItem("token", userData.token);
        setIsAuthenticated(true);
    }
    return (
    <AuthContext.Provider value={{isAuthenticated,getToken, saveUser}}>
        {children}
    </AuthContext.Provider>
    );
}

export const useAuth = ()=> useContext(AuthContext);