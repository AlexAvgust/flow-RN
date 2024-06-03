import { MutableRefObject, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { AgendaSchedule, DateData } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { convertToAgendaSchedule } from '../utils/convertToAgendaSchedult';
import { formatDateToYMD, startAndEndOfTheMonth } from '../utils/dateHelpers';
import useGetSchedules from './useGetSchedules';

interface DateFormatForReq {
    startOfTheMonth: string, endOfTheMonth: string
}

const useAgendaSchedule = () => {
    const schedules = useSelector((state: RootState) => state.schedule.schedule)
    const dateRef: MutableRefObject<DateFormatForReq> = useRef(startAndEndOfTheMonth(formatDateToYMD()))
    const itemsRef: MutableRefObject<AgendaSchedule | undefined> = useRef(undefined)
    const { refetch } = useGetSchedules({
        startDate: dateRef.current.startOfTheMonth,
        endDate: dateRef.current.endOfTheMonth,
    },false)

    const updateDateAndItems = (date: DateData) => {
        dateRef.current = startAndEndOfTheMonth(date.dateString);
        refetch()
        itemsRef.current = { ...itemsRef.current, ...convertToAgendaSchedule(schedules, dateRef.current) };
    }

    return {
        items: itemsRef.current,
        updateDateAndItems
    }
}

export default useAgendaSchedule

const styles = StyleSheet.create({})