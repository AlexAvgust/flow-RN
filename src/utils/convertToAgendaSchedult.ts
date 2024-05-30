import moment from 'moment'
import { Schedule } from '../types/Schedule'
import { Task } from '../types/TaskType'

interface DateFormat {
    startOfTheMonth: string
    endOfTheMonth: string
}

export const convertToAgendaSchedule = (
    schedules: Schedule[],
    date: DateFormat
) => {
    const schedulesByDates: [string, Task[]][] = []

    const startOfMonth = moment(date.startOfTheMonth)
    const endOfMonth = moment(date.endOfTheMonth)
    const daysInMonth = endOfMonth.diff(startOfMonth, 'days') + 1

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
