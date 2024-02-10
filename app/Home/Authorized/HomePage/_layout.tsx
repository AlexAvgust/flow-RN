import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='NewTask' options={{
                presentation: 'modal'
            }} />
        </Stack>

    )
}