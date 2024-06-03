import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Schedule } from '../../types/Schedule'

type ScheduleState = {
    schedule: Schedule[]
}

const initialState: ScheduleState = {
    schedule: [],
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setSchedules: (state, action: PayloadAction<Schedule[]>) => {
            console.log('updated schedule in slice', action.payload)
            if (action.payload.length === 0) {
                state.schedule = []
            }
            state.schedule = [
                ...new Map(
                    [...state.schedule, ...action.payload].map((item) => [
                        item['_id'],
                        item,
                    ])
                ).values(),
            ]
        },
    }
})

export const { setSchedules } = scheduleSlice.actions
