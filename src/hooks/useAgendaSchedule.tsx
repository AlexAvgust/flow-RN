import moment from 'moment';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { AgendaSchedule, DateData } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { useGetScheduleByDateQuery } from '../api/schedule/schedule';
import { RootState } from '../store/store';
import { convertToAgendaSchedule } from '../utils/convertToAgendaSchedult';
import { startAndEndOfTheMonth } from '../utils/startAndEndOfTheMonth';

interface DateFormatForReq {
    startOfTheMonth: string, endOfTheMonth: string
}

const useAgendaSchedule = () => {
    const schedules = useSelector((state: RootState) => state.schedule.schedule)
    const userId = useSelector((state: RootState) => state.user.user?._id) as string;
    
    const dateRef: MutableRefObject<DateFormatForReq> = useRef(startAndEndOfTheMonth(moment().format('YYYY-MM-DD')))
    const itemsRef: MutableRefObject<AgendaSchedule | undefined> = useRef(undefined)

    const { refetch } = useGetScheduleByDateQuery({
        startDate: dateRef.current.startOfTheMonth,
        endDate: dateRef.current.endOfTheMonth,
        userId
    })

    useEffect(() => {
        itemsRef.current = convertToAgendaSchedule(schedules)
    }, [schedules]);

    const loadItemsForMonth = useCallback(async (date: DateData) => {
        dateRef.current = startAndEndOfTheMonth(date.dateString)
        console.log('starting loadItemsForMonth func, date: ', date)
        refetch()
    }, [])


    return {
        items: itemsRef.current,
        loadItemsForMonth
    }
}

export default useAgendaSchedule

const styles = StyleSheet.create({})