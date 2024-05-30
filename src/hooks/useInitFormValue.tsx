import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Task } from '../types/TaskType';
import moment from 'moment';

const useInitFormValue = (taskToEdit: Task | null) => {
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate);
    const editDate = moment(taskToEdit?.taskStartDate).format('YYYY-MM-DD') || null

    console.log('taskToEdit',taskToEdit)

    const dateRef = useRef(editDate ?? currentlySelectedDate)
    const taskNameRef = useRef(taskToEdit?.name ?? '');
    const descriptionRef = useRef(taskToEdit?.description ?? '');
    const startTimeRef = useRef(taskToEdit?.taskStartTime ?? '');
    const endTimeRef = useRef(taskToEdit?.taskEndTime ?? '');
    const priorityRef = useRef(taskToEdit?.priority ?? 0)
    const repeatingRef = useRef(taskToEdit?.isRepeating ?? false)
    console.log(dateRef.current,
        taskNameRef.current,
        descriptionRef.current,
        startTimeRef.current,
        endTimeRef.current,
        priorityRef.current,
        repeatingRef.current,)
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

