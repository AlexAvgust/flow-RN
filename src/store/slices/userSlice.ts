import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/userType'

type UserState = {
    user: User | null
    token: string | null
}

const initialState: UserState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        removeUser: (state) => {
            state = initialState
        },
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    }
})

export const { addUser, removeUser, addToken } = userSlice.actions

