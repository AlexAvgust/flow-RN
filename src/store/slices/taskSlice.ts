import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../types/TaskType'
import moment from 'moment'

type TaskState = {
    taskNames: string[]
    tasks: Task[] | null
    currentlySelectedDate: string
}

const initialState: TaskState = {
    taskNames: [],
    tasks: null,
    currentlySelectedDate: moment().format('YYYY-MM-DD'),
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        removeTasks: (state) => {
            state.tasks = null
        },
        setCurrentlySelectedDate: (state, action: PayloadAction<string>) => {
            state.currentlySelectedDate = action.payload
        },
        addTaskNames: (state, action: PayloadAction<string[]>) => {
            console.log('add task names payload', action.payload)
            state.taskNames = [
                ...new Set([...state.taskNames, ...action.payload]),
            ]
        },
    },
})

export const { setTasks, removeTasks, setCurrentlySelectedDate, addTaskNames } =
    taskSlice.actions

