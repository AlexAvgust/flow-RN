import { Stack } from 'expo-router'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'

export default function _layout() {

    return (
        <SafeAreaProvider>
                <Provider store={store}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Home" />
                    </Stack>
                    <Toast />
                </Provider>
        </SafeAreaProvider>
    )
}
