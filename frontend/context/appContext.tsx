import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";

interface ContextProps {
    token: string;
    isLoggedIn: boolean
    login: (email: string, password: string) => void
}

interface AppContextProps {
    children: ReactNode
}

export const AppCotnext = createContext<ContextProps | null>(null)

export default function AppContextProvider({children}: AppContextProps) {
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (email: string, password: string) => {
        axios.post('auth/signIn', {email, senha: password}).then((res)=>{
            setToken(res.data.token)
        }).catch((err)=>console.log("[LOGIN] "+err))
    }


    return (
        <AppCotnext.Provider value={{token, isLoggedIn, login}}>
            {children}
        </AppCotnext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppCotnext)
    if(context == null){
        throw new Error("useAppContext must be used within AppContextProvider")
    }
    return context;
}