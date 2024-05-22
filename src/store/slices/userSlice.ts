import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/userType'

type UserState = {
    user: User | null
}

const initialState: UserState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state.user = null
        },
    },
})

export const { addUser, removeUser } = userSlice.actions

