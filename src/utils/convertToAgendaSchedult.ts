import { Schedule } from "../types/Schedule"
import { Task } from "../types/TaskType"

export const convertToAgendaSchedule = (schedules: Schedule[]) => { 
    const schedulesByDates: [string, Task[]][] = schedules.map((schedule) => [
        schedule.date,
        schedule.tasks,
    ])

    const withHeight = schedulesByDates.map(
        ([date, tasks]) => [
            date,
            tasks.map((task: Task) => ({
                ...task,
                height: task.taskDuration / 10000,
            })),
        ]
    )

    return Object.fromEntries(withHeight)
}