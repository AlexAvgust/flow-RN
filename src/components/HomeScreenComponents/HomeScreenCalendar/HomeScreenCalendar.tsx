import React, { memo, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { DateData } from 'react-native-calendars'
import { useDispatch } from 'react-redux'
import useGetTaskByDate from '../../../hooks/useGetTaskByDate'
import { setCurrentlySelectedDate } from '../../../store/slices/taskSlice'
import CalendarWithAgenda from '../../SharedComponents/CalendarWithAgenda/CalendarWithAgenda'
import { View } from 'react-native-ui-lib'


const HomeScreenCalendar = () => {
    const dispatch = useDispatch();
    const { tasks, fetchTasks } = useGetTaskByDate()

    useEffect(() => {
        dispatch(setCurrentlySelectedDate(new Date().toISOString()))
        fetchTasks(new Date().toISOString())
    }, [])

    const onDatePressed = (date: DateData) => {
        dispatch(setCurrentlySelectedDate(date.dateString))
        fetchTasks(date.dateString)
    }
    console.log('tasks', tasks)
    return (
        <View>
            <CalendarWithAgenda onDatePressed={onDatePressed} tasks={tasks} />
        </View>
    )
}


export default memo(HomeScreenCalendar)

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightgrey'
    },
    section: {
        color: 'grey',
        textTransform: 'capitalize'
    }
});