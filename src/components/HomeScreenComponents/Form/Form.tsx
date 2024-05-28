import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { useGetScheduleByDateQuery } from '../../../api/schedule/schedule';
import { useAddTaskMutation } from '../../../api/task/task';
import { RootState } from '../../../store/store';
import ButtonWithStates from '../../SharedComponents/ButtonWithStates/ButtonWithStates';
import CheckboxComponent from '../../SharedComponents/CheckboxComponent/CheckboxComponent';
import PickerComponent from '../../SharedComponents/PickerComponent/PickerComponent';
import TextFieldWithLabel from '../../SharedComponents/TextFieldWithLabel/TextFieldWithLabel';
import { AutocompleteDropdown } from './AutocompleteDropdown/AutocompleteDropdown';
import DataPicker from './DataPicker';
import { validationSchema } from './FormValidation/FormValidation';
import TimePicker from './TimePicker/TimePicker';

const priorities = [
    { label: 'Low', value: 0 },
    { label: 'Medium', value: 1 },
    { label: 'High', value: 2 },
    { label: 'Urgent', value: 3 },
    { label: 'Critical', value: 4 }
];

export const Form = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate);

    const dateRef = useRef(currentlySelectedDate)
    const taskNameRef = useRef('');
    const descriptionRef = useRef('');
    const startTimeRef = useRef('');
    const endTimeRef = useRef('');
    const priorityRef = useRef(0)
    const repeatingRef = useRef(false)

    const [addTask, { isError, isLoading, isSuccess }] = useAddTaskMutation();

    //TODO implement invalidate func 
    const { refetch: refetchSchedule } = useGetScheduleByDateQuery({ startDate: dateRef.current, userId: user?._id as string }, { skip: !user?._id })


    const onSubmitForm = async () => {
        try {
            const values = {
                task_name: taskNameRef.current.trim(),
                description: descriptionRef.current.trim(),
                date: dateRef.current,
                start_time: startTimeRef.current,
                end_time: endTimeRef.current,
                priority: priorityRef.current,
                repeating: repeatingRef.current,
            };
            console.log('values', JSON.stringify(values))
            await validationSchema.validate(values, { abortEarly: false });
            const startTime = moment(values.start_time).valueOf();
            const endTime = moment(values.end_time).valueOf();
            const taskDuration = endTime - startTime;
            if (taskDuration < 0) {
                Toast.show({
                    type: 'info',
                    text1: `Duration can't be negative number`,
                });
                return;
            }
            const taskStartDate = new Date(values.date);
            const taskObj = {
                name: values.task_name,
                taskStartDate,
                taskDuration,
                description: values.description,
                priority: values.priority,
                isRepeating: values.repeating,
                user: user,
            };
            await addTask(taskObj).unwrap();
            router.back()
            Toast.show({
                type: 'success',
                text1: 'New task successfully created 👏🙌',
            });
            
            
            await refetchSchedule()
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

    return (
        <View gap-30 flex centerH >
            <DataPicker
                dateString={dateRef.current}
                onChange={(newDate) => dateRef.current = newDate}
            />
            <Text style={styles.labelStyle}>
                Enter your task name
            </Text>
            <AutocompleteDropdown
                onChange={(newTaskName) => taskNameRef.current = newTaskName}
            />
            <TextFieldWithLabel
                label="Enter your task description"
                onChange={(value: string) => descriptionRef.current = value}
            />
            <View row gap-30>
                <View gap-10>
                    <TimePicker fieldName='start_time' onChange={(value: Date) => startTimeRef.current = value.toISOString()} />
                    <TimePicker fieldName='end_time' onChange={(value: Date) => endTimeRef.current = value.toISOString()} />
                </View>
                <View gap-15>
                    <PickerComponent
                        onChange={(value) => priorityRef.current = value}
                        items={priorities}
                        label='Choose your priority' />

                    <CheckboxComponent
                        onChange={(value: boolean) => repeatingRef.current = value}
                        label='Is it repeating task'
                    />
                </View>
            </View>
            <ButtonWithStates
                error={isError}
                label='Submit'
                loading={isLoading}
                success={isSuccess}
                onPressFunc={onSubmitForm}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 14,
        color: '#1a1a1a',
        paddingLeft: 10,
        width: '80%', alignSelf: 'auto'
    }
});
