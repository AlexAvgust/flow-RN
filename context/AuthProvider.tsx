import * as Linking from 'expo-linking';
import { router } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import React, { ReactNode, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProtectedRoute } from "../src/hooks/useAuthHooks";
import { addToken, addUser, removeUser } from "../src/store/slices/userSlice";
import { RootState } from "../src/store/store";
import { User } from "../src/types/userType";


type AuthContextType = {
    user: User | null;
    login: () => Promise<void>;
    logout: () => void;
};



export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => { },
    logout: () => { },
});



export default function AuthProvider({ children }: { children: ReactNode }) {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)
    const token = useSelector((state: RootState) => state.user.token)

    const decodeAndDispatchUserAndToken = (url: string) => {
        const decodedUserData = JSON.parse(decodeURIComponent(
            url.split('user=')[1]
        ));
        dispatch(addUser(decodedUserData.user));
        dispatch(addToken(decodedUserData.token));
    };

    const login = async () => {
        const redirectUrl = await WebBrowser.openAuthSessionAsync(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth`
        )
        console.log(`${process.env.EXPO_PUBLIC_BACKEND_URL} - backend link`)
        Linking.addEventListener('url', (event) => {
            decodeAndDispatchUserAndToken(event)
        })
        if (redirectUrl.type === 'success') {
            decodeAndDispatchUserAndToken(redirectUrl)
        }

    }


    const logout = () => {
        dispatch(removeUser())
    };

    useEffect(() => {
        const handleDeepLink = ({ url }: { url: string }) => {
            if (url.includes('user=')) {
                decodeAndDispatchUserAndToken(url);
            }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);
        
        // Check if the app was opened with a URL
        Linking.getInitialURL().then((url) => {
            if (url && url.includes('user=')) {
                decodeAndDispatchUserAndToken(url);
            }
        });

        return () => {
            subscription.remove()
        };
    }, []);


    useProtectedRoute(token);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}