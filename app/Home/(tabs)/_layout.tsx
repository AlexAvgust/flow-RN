import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../src/store/store'
import { useDispatch } from 'react-redux'
import { useGetTasksNamesByUserQuery } from '../../../src/api/task/task'
import { User } from '../../../src/types/userType'
import { filterScheduleByDate } from '../../../src/utils/filterScheduleByDate'
import { setTasks } from '../../../src/store/slices/taskSlice'
import { CalendarProvider } from 'react-native-calendars'
import { useGetScheduleByDateQuery } from '../../../src/api/schedule/schedule'


export default function _layout() {
    const user = useSelector((state: RootState) => state.user.user)
    const schedule = useSelector((state: RootState) => state.schedule.schedule) || [];
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)

    const dispatch = useDispatch()
    const { refetch: refetchTaskNames } = useGetTasksNamesByUserQuery(user as User)
    const { refetch: refetchScheduleOnStartUp } = useGetScheduleByDateQuery({ startDate: currentlySelectedDate, userId: false });

    useEffect(() => {
        refetchScheduleOnStartUp()
        refetchTaskNames()
        
        const tasksForDate = filterScheduleByDate(schedule, currentlySelectedDate)
        console.log('tasksForDate length', tasksForDate.length);
        
        dispatch(setTasks(tasksForDate))
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
                {/* <Tabs.Screen
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
                /> */}
            </Tabs>
        </CalendarProvider>
    )
}
