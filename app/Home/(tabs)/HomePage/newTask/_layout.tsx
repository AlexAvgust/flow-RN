import React from 'react'
import { Stack } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../src/store/store'

export default function _layout() {
    const selectedTask = useSelector((state:RootState) => state.task.selectedTask)
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: `${selectedTask?.name ? `Edit a task: ${selectedTask?.name}` : 'New task'}`,
                }}
            />
        </Stack>
    )
}
