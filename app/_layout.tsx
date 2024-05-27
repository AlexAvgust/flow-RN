import { Stack } from 'expo-router'
import React from 'react'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import AuthProvider from '../context/AuthProvider'

export default function _layout() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="Auth/login" />
                    <Stack.Screen name="Home/(tabs)" />
                </Stack>
            </AuthProvider>
            <Toast />
        </Provider>
    )
}
