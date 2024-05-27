import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

export function useProtectedRoute(token: string | null) {
    useEffect(() => {
        if (!token ) {
            console.log('replace route to login')
            router.replace("/Auth/login");
        } else if (token ) {
            console.log('replace route to home')

            router.replace("/Home/(tabs)/");
        }
    }, [token]);
}


export function useAuth() {
    if (!useContext(AuthContext)) {
        throw new Error("useAuth must be used within a <AuthProvider />");
    }

    return useContext(AuthContext);
}
