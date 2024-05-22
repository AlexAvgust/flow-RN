import { setSchedules } from '../../store/slices/scheduleSlice'
import { setTasks } from '../../store/slices/taskSlice'
import { Schedule } from '../../types/Schedule'
import { api } from '../api'
import { GetScheduleByDateRequest } from './schedule.interfaces'

const scheduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getScheduleByDate: builder.query<Schedule[], GetScheduleByDateRequest>({
            query: (req) => ({
                url: `/schedule/by-date`,
                method: 'GET',
                params: {
                    startDate: req.startDate,
                    userId: req.userId,
                },
            }),
            onQueryStarted: async (arg, api) => {
                const { dispatch, queryFulfilled } = api
                const { data } = await queryFulfilled
                console.log('query started')

                if (data) {
                    dispatch(setSchedules(data))
                } else {
                    dispatch(setSchedules([]))
                }
            },
            keepUnusedDataFor: 0,
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                console.error(baseQueryReturnValue.data)
            },
        }),
    }),
})

export const { useGetScheduleByDateQuery } = scheduleApi
