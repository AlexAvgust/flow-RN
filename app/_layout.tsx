import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import { CalendarProvider } from 'react-native-calendars'

export default function _layout() {
    return (
        <CalendarProvider date={Date()}>
            <Provider store={store}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Home' />
            </Stack>
        </Provider>
        </CalendarProvider >
    )
}