import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task} from '../../types/TaskType'

type TaskState = {
    tasks: Task[] | null,
    currentlySelectedDate: string
}

const initialState: TaskState = {
    tasks: null,
    currentlySelectedDate: new Date().toISOString()
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },
        removeTasks: (state) => {
            state.tasks = null
        },
        setCurrentlySelectedDate: (state,action:PayloadAction<string>) => {
            state.currentlySelectedDate = action.payload
        }
     },
})

export const { addTasks, removeTasks,setCurrentlySelectedDate } = taskSlice.actions

export default taskSlice.reducer
