
import { DateData } from "react-native-calendars";
import { Task } from "../../../types/TaskType";

export interface CalendarWithAgendaProps {
    onDatePressed: (date: DateData) => void;
    tasks: Task[] | null
}