import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { useAddTaskMutation, useEditTaskMutation } from '../api/task/task';
import { AddTask } from '../api/task/task.interface';
import { validationSchema } from '../components/HomeScreenComponents/Form/FormValidation/FormValidation';
import { RootState } from '../store/store';
import { Task } from '../types/TaskType';
import { calculateTaskDuration, convertDateWithTimeToTimeString } from '../utils/dateHelpers';
import useInitFormValue from './useInitFormValue';


const useAddOrEdit = () => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user);
    const [addTask, { isError: isErrorAdd, isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] = useAddTaskMutation();
    const [editTask, { isError: isErrorEdit, isLoading: isLoadingEdit, isSuccess: isSuccessEdit }] = useEditTaskMutation();
    const taskToEdit = useSelector((state: RootState) => state.task.selectedTask)
    const { dateRef, descriptionRef, endTimeRef, priorityRef, repeatingRef, startTimeRef, taskNameRef } = useInitFormValue(taskToEdit)
    const edit = taskToEdit?.name ? true : false

    const isError = edit ? isErrorEdit : isErrorAdd;
    const isLoading = edit ? isLoadingEdit : isLoadingAdd;
    const isSuccess = edit ? isSuccessEdit : isSuccessAdd;


    const onSubmitForm = async () => {
        try {
            const values = {
                task_name: taskNameRef.current.trim(),
                description: descriptionRef.current.trim(),
                date: dateRef.current,
                start_time: startTimeRef.current,
                end_time: endTimeRef.current,
                priority: priorityRef.current,
                taskAddedBy: 'User',
                repeating: repeatingRef.current,
            };
            await validationSchema.validate(values, { abortEarly: false });
            const taskDuration = calculateTaskDuration(values.start_time, values.end_time)
            if (taskDuration < 0) {
                Toast.show({
                    type: 'info',
                    text1: `Duration can't be negative number`,
                });
                return;
            }
            const taskStartDate = new Date(values.date);
            const taskObj: AddTask = {
                name: values.task_name,
                taskStartDate,
                taskDuration,
                taskStartTime: convertDateWithTimeToTimeString(values.start_time),
                taskEndTime: convertDateWithTimeToTimeString(values.end_time) ,
                description: values.description,
                priority: values.priority,
                taskAddedBy: values.taskAddedBy,
                isRepeating: values.repeating,
                user: user?._id as string,
            };
            if (edit) {
                const updateTaskObj: Task = {...taskObj, _id: taskToEdit?._id as string}
                await editTask(updateTaskObj).unwrap();
            } else {
                await addTask(taskObj).unwrap()
            }
            router.back()
            Toast.show({
                type: 'success',
                text1: `New task successfully ${edit ? 'edited' : 'created'} 👏🙌`,
            });

        } catch (err: any) {
            // Validation failed, show validation errors
            if (err?.inner) {
                err.inner.map((el: any) => el.path)
                    .map((errorField: string) => {
                        Toast.show({
                            type: 'error',
                            text1: `${errorField} is required`,
                        });
                    })
            }
        }
    };
    return {
        refs: { dateRef, descriptionRef, endTimeRef, priorityRef, repeatingRef, startTimeRef, taskNameRef },
        statuses: { isError, isLoading, isSuccess },
        onSubmitForm: onSubmitForm
    };
}

export default useAddOrEdit

