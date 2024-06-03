import moment from 'moment'
import 'moment-duration-format'
import { Task } from '../types/TaskType'

export const convertTimeToFullDate = (timeString?: string) => {
    const fullDate = moment()
        .startOf('day')
        .set({
            hour: moment(timeString, 'HH:mm').hours(),
            minute: moment(timeString, 'HH:mm').minutes(),
        })
        .toDate()
    if (timeString) {
        return fullDate
    } else {
        return moment().toDate()
    }
}

export const convertDateWithTimeToTimeString = (date: string | Date) => {
    return moment(date).format('HH:mm')
}

export const calculateTaskDuration = (startTime: string, endTime: string) => {
    const _startTime = moment(startTime).valueOf()
    const _endTime = moment(endTime).valueOf()
    const taskDuration = _endTime - _startTime
    return taskDuration
}

export const formatDateToYMD = (date?: Date): string => {
    return moment(date).format('YYYY-MM-DD')
}

export const startAndEndOfTheMonth = (date: string) => {
    const momentDate = moment(date)
    return {
        startOfTheMonth: momentDate.startOf('month').format('YYYY-MM-DD'),
        endOfTheMonth: momentDate.endOf('month').format('YYYY-MM-DD'),
    }
}

export const getFormattedDuration = (duration: number, format?: string) => {
    let formattedDuration: string
    switch (format) { 
        case 'full':
            formattedDuration = 'h [hrs] m [mins]'
            break
        default:
            formattedDuration = 'h [h] m [m]'
            break
    }

    return moment.duration(duration).format(formattedDuration)
}


export const sortTasksByStartTime = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
        const startTimeA = moment(a.taskStartTime, 'HH:mm')
        const startTimeB = moment(b.taskStartTime, 'HH:mm')
        return startTimeA.diff(startTimeB)
    })
}

export const formatCurrentDateToReadableString = (date?: Date) => {
    //example 30 May 2024
    return moment(date).format('D MMMM YYYY')
}

export const calculateDaysInMonth = (
    startOfMonth: string,
    endOfMonth: string
) => {
    const start = moment(startOfMonth)
    const end = moment(endOfMonth)
    return end.diff(start, 'days') + 1
}

export const getDayOfTheWeek = (date: string | Date) => {
    return moment(date).format('dddd')
}