import axios from 'axios'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import moment from 'moment'
import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'
import { Button, Checkbox, Picker, TextField, View } from 'react-native-ui-lib'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import DataPicker from './DataPicker'
import TimePicker from './TimePicker/TimePicker'


export const Form = memo(() => {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.user.user)
    const currentlySelectedDate = useSelector((state: RootState) => state.task.currentlySelectedDate)
    const priorities = [
        { label: 'Low', value: 0 },
        { label: 'Medium', value: 1 },
        { label: 'High', value: 2 },
        { label: 'Urgent', value: 3 },
        { label: 'Critical', value: 4 }
    ];

    const initialValues = {
        task_name: '',
        description: '',
        date: currentlySelectedDate,
        start_time: '',
        end_time: '',
        priority: 0,
        repeating: false
    }

    const onSubmitForm = (values: typeof initialValues) => {
        const startTime = moment(values.start_time).valueOf()
        const endTime = moment(values.end_time).valueOf()
        const taskDuration = endTime - startTime
        if (taskDuration < 0) {
            Toast.show({
                type: 'info',
                text1: `Duration can't be negative number`,
            });
            return
        }
        const taskStartDate = new Date(values.date)
        console.log(`${process.env.EXPO_PUBLIC_BACKEND_URL}/task`)
        axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/task`, {
            name: values.task_name,
            taskStartDate,
            taskDuration,
            description: values.description,
            priority: values.priority,
            isRepeating: values.repeating,
            user: user

        }).then(res => {
            Toast.show({
                type: 'success',
                text1: 'New task successfully created 👏🙌',
            });
            router.push('/Home/Authorized/HomePage')
        }).catch(err => {
            Toast.show({
                type: 'error',
                text1: `${err.message}`,
            });
            console.error(err)
        })
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitForm}
        >
            {({ handleChange,
                setFieldValue,
                handleBlur,
                handleSubmit,
                values }) => (
                <View gap-30 flex centerH>
                    <DataPicker fieldName='date' />
                    <TextField
                        fieldStyle={styles.taskNameFieldStyle}
                        label="Enter your task name"
                        labelStyle={styles.labelStyle}
                        onChangeText={handleChange('task_name')}
                        onBlur={handleBlur('task_name')}
                        value={values.task_name}
                    />
                    <TextField
                        fieldStyle={styles.descriptionFieldStyle}
                        label="Enter your task description"
                        labelStyle={styles.labelStyle}
                        multiline
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                    />
                    <View row gap-30>
                        <View gap-10>
                            <TimePicker fieldName='start_time' />
                            <TimePicker fieldName='end_time' />
                        </View>
                        <View gap-15>
                            <Picker
                                style={styles.selectStyles}
                                value={values.priority}
                                onChange={(val) => setFieldValue('priority', val)}
                                useWheelPicker={true} items={priorities} label='Choose your priority' />

                            <Checkbox label='Is it repeating task'
                                value={values.repeating}
                                onValueChange={(val) => setFieldValue('repeating', val)} />
                        </View>
                    </View>
                    <Button backgroundColor="#000" onPress={handleSubmit} label="Submit" />
                </View>
            )}
        </Formik>
    )
})


const styles = StyleSheet.create({
    taskNameFieldStyle: {
        width: '80%',
        borderBlockColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    descriptionFieldStyle: {
        width: '80%',
        height: 80,
        borderBlockColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    labelStyle: {
        fontSize: 14,
        color: '#1a1a1a',
        paddingLeft: 10,
        paddingBottom: 7
    },
    selectStyles: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingTop: 0
    }
})