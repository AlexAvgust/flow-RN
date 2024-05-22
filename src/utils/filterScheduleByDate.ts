import { Schedule } from "../types/Schedule";

export const filterScheduleByDate = (schedule: Schedule[], dateString: string) => {
   return schedule
        .filter((item) => item.date === dateString)
        .flatMap((item) => item.tasks)
}