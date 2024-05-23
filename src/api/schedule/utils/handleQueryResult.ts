import { ActionCreator } from '@reduxjs/toolkit'

export const handleQueryResult = async <T>(
    api: any,
    action: ActionCreator<T>
) => {
    const { dispatch, queryFulfilled, getCacheEntry } = api
    const { data: cachedData } = getCacheEntry()
    if (cachedData) {
        dispatch(action(cachedData))
    } else {
        const { data } = await queryFulfilled
        if (data) {
            dispatch(action(data))
        } else {
            dispatch(action([]))
        }
    }
    console.log('handleQueryResult started')
}
