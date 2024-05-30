import { ActionCreator } from '@reduxjs/toolkit'

export const handleQueryResult = async <T>(
    api: any,
    action: ActionCreator<T>
) => {
    const { dispatch, queryFulfilled } = api
        console.log('handleQueryResult NOT cachedData')
    const { data } = await queryFulfilled
    console.log('data:::',data)
        if (data) {
            dispatch(action(data))
        } else {
            dispatch(action([]))
        }
    console.log('handleQueryResult started')
}
