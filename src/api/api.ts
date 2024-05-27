import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'



export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.EXPO_PUBLIC_BACKEND_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token as string 
            if (token) {
                headers.set('Authorization', `${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({})
})

