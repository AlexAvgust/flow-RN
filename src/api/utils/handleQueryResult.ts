import { ActionCreator } from '@reduxjs/toolkit'

export const handleQueryResult = async <T>(
    api: any,
    action: ActionCreator<T>
) => {
    const { dispatch, queryFulfilled, getCacheEntry } = api
    const { data: cachedData } = getCacheEntry()
    if (cachedData) {
        console.log('handleQueryResult cachedData 1 + cachedData: ' + JSON.stringify(cachedData))
        dispatch(action(cachedData))
    } else {
        console.log('handleQueryResult NOT cachedData')
    const { data } = await queryFulfilled
    console.log('data:::',data)
        if (data) {
            dispatch(action(data))
        } else {
            dispatch(action([]))
        }
    }
    console.log('handleQueryResult started')
}
