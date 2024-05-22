import { addTaskNames, setTasks } from '../../store/slices/taskSlice'
import { Task } from '../../types/TaskType'
import { User } from '../../types/userType'
import { api } from '../api'

type AddTask = Omit<Task, '_id'>

const taskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasksNamesByUser: builder.query<string[], User>({
            query: (user) => ({
                url: `/task/user/${user._id}`,
                method: 'GET',
            }),
            onQueryStarted: async (arg, api) => {
                const { dispatch, queryFulfilled } = api

                const { data } = await queryFulfilled
                dispatch(addTaskNames(data))
            },
        }),
        addTask: builder.mutation<Task, AddTask>({
            query: (task: Task) => ({
                url: `/task`,
                method: 'POST',
                body: task,
            }),
            onQueryStarted: async (arg, api) => {
                const { dispatch, queryFulfilled } = api
                const { data } = await queryFulfilled
                dispatch(setTasks([data]))
            },
        }),
    }),
})

export const { useAddTaskMutation, useGetTasksNamesByUserQuery } = taskApi
