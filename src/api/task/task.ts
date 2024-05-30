import Toast from 'react-native-toast-message'
import { addTaskNames, setTasks } from '../../store/slices/taskSlice'
import { Task } from '../../types/TaskType'
import { User } from '../../types/userType'
import { api } from '../api'
import { handleQueryResult } from '../utils/handleQueryResult'
import { AddTask } from './task.interface'



const taskApi = api
    .enhanceEndpoints({ addTagTypes: ['Tasks'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getTasksNamesByUser: builder.query<string[], User>({
                query: (user) => ({
                    url: `/task/user/${user._id}`,
                    method: 'GET',
                }),
                onQueryStarted: async (arg, api) => {
                    console.log('query started, arg: ' + JSON.stringify(arg))
                    await handleQueryResult(api, addTaskNames)
                },
            }),
            addTask: builder.mutation<Task, AddTask>({
                query: (task: Task) => ({
                    url: `/task`,
                    method: 'POST',
                    body: task,
                }),
                invalidatesTags: ['Schedules'],
                transformErrorResponse(baseQueryReturnValue, meta, arg) {
                    Toast.show({
                        type: 'error',
                        text1: `${baseQueryReturnValue.status}`
                    })
                }
            }),
            editTask: builder.mutation<Task, Task>({
                query: (task: Task) => ({
                    url: `/task`,
                    method: 'PUT',
                    body:task
                }),
                invalidatesTags: ['Schedules'],
                transformErrorResponse(baseQueryReturnValue, meta, arg) {
                    console.error(baseQueryReturnValue.data)
                    Toast.show({
                        type: 'error',
                        text1: `${baseQueryReturnValue.status}`
                    })
                }
            }),
            deleteTask: builder.mutation<null, string>({
                query: (taskId: string) => ({
                    url: `/task/${taskId}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Schedules'],
                transformErrorResponse(baseQueryReturnValue, meta, arg) {
                    Toast.show({
                        type: 'error',
                        text1: `${baseQueryReturnValue.status}`
                    })
                }
            }),
        })
    })

export const { useAddTaskMutation, useGetTasksNamesByUserQuery, useEditTaskMutation, useDeleteTaskMutation } = taskApi
