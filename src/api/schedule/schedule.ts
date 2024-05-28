import { setSchedules } from '../../store/slices/scheduleSlice'
import { Schedule } from '../../types/Schedule'
import { api } from '../api'
import { handleQueryResult } from '../utils/handleQueryResult'
import { GetScheduleByDateRequest } from './schedule.interfaces'

const scheduleApi = api
    .enhanceEndpoints({ addTagTypes: ['Schedules'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getScheduleByDate: builder.query<
                Schedule[],
                GetScheduleByDateRequest
            >({
                query: ({ startDate, endDate, userId }) => ({
                    url: `/schedule/by-date`,
                    method: 'GET',
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                        userId: userId,
                    },
                }),
                onQueryStarted: async (arg, api) => {
                    await handleQueryResult(api, setSchedules)
                },
                providesTags: (
                    result,
                    error,
                    { startDate, endDate, userId }
                ) => [
                    {
                        type: 'Schedules',
                        id: `${startDate}_${endDate}_${userId}`,
                    },
                ],
                keepUnusedDataFor: 10,
                transformErrorResponse(baseQueryReturnValue, meta, arg) {
                    console.error(baseQueryReturnValue.status)
                },
            }),
        }),
    })

export const { useGetScheduleByDateQuery } = scheduleApi
