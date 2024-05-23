import { setSchedules } from '../../store/slices/scheduleSlice'
import { Schedule } from '../../types/Schedule'
import { api } from '../api'
import { handleQueryResult } from './utils/handleQueryResult'
import { GetScheduleByDateRequest } from './schedule.interfaces'

const scheduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getScheduleByDate: builder.query<Schedule[], GetScheduleByDateRequest>({
            query: (req) => ({
                url: `/schedule/by-date`,
                method: 'GET',
                params: {
                    startDate: req.startDate,
                    endDate: req.endDate,
                    userId: req.userId,
                },
            }),
            onQueryStarted: async (arg, api) => {
               await handleQueryResult(api,setSchedules)
            },
            keepUnusedDataFor: 120,
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                console.error(baseQueryReturnValue.status)
            },
        }),
    }),
})

export const { useGetScheduleByDateQuery } = scheduleApi
