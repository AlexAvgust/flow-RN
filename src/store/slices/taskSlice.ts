import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../../types/TaskType'
import moment from 'moment'

type TaskState = {
    taskNames: string[]
    tasks: Task[] | null
    currentlySelectedDate: string
    selectedTask: Task | null
}

const initialState: TaskState = {
    taskNames: [],
    tasks: null,
    currentlySelectedDate: moment().format('YYYY-MM-DD'),
    selectedTask: null
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload.sort((a, b) => {
                const startTimeA = moment(a.taskStartTime, 'HH:mm');
                const startTimeB = moment(b.taskStartTime, 'HH:mm');
                return startTimeA.diff(startTimeB);
            })
        },
        setSelectedTask: (state, action: PayloadAction<Task|null>) => {
            state.selectedTask = action.payload
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

export const {
    setTasks,
    removeTasks,
    setCurrentlySelectedDate,
    addTaskNames,
    setSelectedTask,
} = taskSlice.actions

