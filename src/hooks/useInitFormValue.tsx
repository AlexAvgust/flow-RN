import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Task } from '../types/TaskType';
import { convertTimeToFullDate, formatDateToYMD } from '../utils/dateHelpers';

const useInitFormValue = (taskToEdit: Task | null) => {
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate);
    const editDate = taskToEdit ? formatDateToYMD(taskToEdit.taskStartDate): null
    console.log('end time ', taskToEdit?.taskStartTime);

    
    const dateRef = useRef( editDate ?? currentlySelectedDate)
    const taskNameRef = useRef(taskToEdit?.name ?? '');
    const descriptionRef = useRef(taskToEdit?.description ?? '');
    const startTimeRef = useRef(convertTimeToFullDate(taskToEdit?.taskStartTime));
    const endTimeRef = useRef(convertTimeToFullDate(taskToEdit?.taskEndTime))
    const priorityRef = useRef(taskToEdit?.priority ?? 0)
    const repeatingRef = useRef(taskToEdit?.isRepeating ?? false)
  
    return {
        dateRef,
        taskNameRef,
        descriptionRef,
        startTimeRef,
        endTimeRef,
        priorityRef,
        repeatingRef,
    }
}

export default useInitFormValue

