import React from 'react'
import { Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/store/store'



export default function _layout() {
    const user = useSelector((state: RootState) => state.user)
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {!!user ? <Stack.Screen name='Authorized' /> :
                <Stack.Screen name='Unauthorized' />}
        </Stack>

    )
}



