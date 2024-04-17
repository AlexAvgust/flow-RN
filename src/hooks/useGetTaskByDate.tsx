import axios from 'axios'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { Task } from '../types/TaskType'
import { Schedule } from '../types/Schedule'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const getTaskByDate = async (date: string, userId: string) => {
    try {
        const isoDate = new Date(date).toISOString()
        console.log(`date : ${isoDate}`)
        const requestData = {
            date: isoDate,
            userId: userId
        };
        console.log(process.env.EXPO_PUBLIC_BACKEND_URL)
        const tasks = await axios.get<Schedule>(`${process.env.EXPO_PUBLIC_BACKEND_URL}/schedule/by-date`, {
            params: requestData
        })
        console.log(`tasks : ${JSON.stringify(tasks.data)}`)
        return tasks?.data?.tasks ? tasks?.data?.tasks : []
    }
    catch (error) {
        Toast.show({
            type: 'error',
            text1: `Error during loading tasks`,
        });
        console.error(error)
        return null
    }
}

export default function useGetTaskByDate() {
    const [tasks, setTasks] = useState<Task[] | null>([])
    const userId = useSelector((state: RootState) => state.user.user?._id) as string
    const fetchTasks = async (date: string) => {
        const tasksData = await getTaskByDate(date, userId);
        setTasks(tasksData);
    }

    return { tasks, fetchTasks }
}