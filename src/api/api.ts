import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'


console.log('${process.env.EXPO_PUBLIC_BACKEND_URL}',process.env.EXPO_PUBLIC_BACKEND_URL)

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.EXPO_PUBLIC_BACKEND_URL}`,
    }),
    endpoints: (builder) => ({})
})

