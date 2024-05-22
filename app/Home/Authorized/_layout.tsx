import { AntDesign, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetTasksNamesByUserQuery } from '../../../src/api/task/task'
import { RootState } from '../../../src/store/store'
import { User } from '../../../src/types/userType'
import { useDispatch } from 'react-redux'
import { setCurrentlySelectedDate, setTasks } from '../../../src/store/slices/taskSlice'
import moment from 'moment'
import { filterScheduleByDate } from '../../../src/utils/filterScheduleByDate'
import { CalendarProvider } from 'react-native-calendars'

export default function _layout() {
    const user = useSelector((state: RootState) => state.user.user)
    const schedule = useSelector((state: RootState) => state.schedule.schedule) || [];
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)

    const dispatch = useDispatch()
    const { refetch } = useGetTasksNamesByUserQuery(user as User)
    useEffect(() => {
        const currentDate = moment().format('YYYY-MM-DD')
        dispatch(setCurrentlySelectedDate(currentDate))
        const tasksForDate = filterScheduleByDate(schedule, currentDate)
        dispatch(setTasks(tasksForDate))
        refetch()
        console.log('================================')
    }, [])
    return (
        <CalendarProvider date={currentlySelectedDate}>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    headerShadowVisible: false,
                    tabBarItemStyle: {
                        padding: 5,
                    },
                }}
            >
                <Tabs.Screen
                    name="HomePage"
                    options={{
                        tabBarIcon: () => (
                            <AntDesign name="home" size={22} color="black" />
                        ),
                        tabBarLabel: 'Home',
                    }}
                />
                <Tabs.Screen
                    name="Schedule"
                    options={{
                        tabBarIcon: () => (
                            <MaterialIcons
                                name="schedule"
                                size={22}
                                color="black"
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Profile"
                    options={{
                        tabBarIcon: () => (
                            <Octicons name="person" size={22} color="black" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Settings"
                    options={{
                        tabBarIcon: () => (
                            <Ionicons
                                name="settings-outline"
                                size={22}
                                color="black"
                            />
                        ),
                    }}
                />
            </Tabs>
        </CalendarProvider>
    )
}
