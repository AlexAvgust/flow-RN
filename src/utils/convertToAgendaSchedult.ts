import moment from 'moment'
import { Schedule } from '../types/Schedule'
import { Task } from '../types/TaskType'
import { calculateDaysInMonth } from './dateHelpers'
import { AgendaSchedule } from 'react-native-calendars'

interface DateFormat {
    startOfTheMonth: string
    endOfTheMonth: string
}

export const convertToAgendaSchedule = (
    schedules: Schedule[],
    date: DateFormat
):AgendaSchedule => {
    const schedulesByDates: [string, Task[]][] = []

    const startOfMonth = moment(date.startOfTheMonth)
    const daysInMonth = calculateDaysInMonth(date.startOfTheMonth, date.endOfTheMonth)

    for (let i = 0; i < daysInMonth; i++) {
        const dayInMonth = startOfMonth
            .clone()
            .add(i, 'days')
            .format('YYYY-MM-DD')
        const schedule = schedules.find(
            (schedule) => schedule.date === dayInMonth
        )

        if (schedule) {
            schedulesByDates.push([dayInMonth, schedule.tasks])
        } else {
            schedulesByDates.push([dayInMonth, []])
        }
    }
    const withHeight = schedulesByDates.map(([date, tasks]) => [
        date,
        tasks.map((task: Task) => {
            const height = task.taskDuration / 100000
            return {
                ...task,
                height: height < 50 ? 50: height,
            }
        }),
    ])
    console.log('with height: ' + JSON.stringify(withHeight))
    return Object.fromEntries(withHeight)
}
