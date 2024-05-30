import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import useAddOrEdit from '../../../hooks/useAddOrEdit';
import { priorities } from '../../../utils/priorityMaper';
import ButtonWithStates from '../../SharedComponents/ButtonWithStates/ButtonWithStates';
import CheckboxComponent from '../../SharedComponents/CheckboxComponent/CheckboxComponent';
import PickerComponent from '../../SharedComponents/PickerComponent/PickerComponent';
import TextFieldWithLabel from '../../SharedComponents/TextFieldWithLabel/TextFieldWithLabel';
import { AutocompleteDropdown } from './AutocompleteDropdown/AutocompleteDropdown';
import DataPicker from './DataPicker';
import TimePicker from './TimePicker/TimePicker';



export const Form = () => {
    const {
        refs: { dateRef, descriptionRef, endTimeRef, priorityRef, repeatingRef, startTimeRef, taskNameRef },
        statuses: { isError, isLoading, isSuccess },
        onSubmitForm: onSubmitForm
    } = useAddOrEdit()


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
                name={taskNameRef.current}
                onChange={(newTaskName) => taskNameRef.current = newTaskName}
            />
            <TextFieldWithLabel
                label="Enter your task description"
                description={descriptionRef.current}
                onChange={(value: string) => descriptionRef.current = value}
            />
            <View row gap-30>
                <View gap-10>
                    <TimePicker
                        fieldName='start_time'
                        onChange={(value: Date) => startTimeRef.current = value.toISOString()}
                        startTime={startTimeRef.current}
                    />
                    <TimePicker
                        fieldName='end_time'
                        onChange={(value: Date) => endTimeRef.current = value.toISOString()}
                        endTime={endTimeRef.current}
                    />
                </View>
                <View gap-15>
                    <PickerComponent
                        priority={priorityRef.current}
                        onChange={(value) => priorityRef.current = value}
                        items={priorities}
                        label='Choose your priority' />

                    <CheckboxComponent
                        isRepeating={repeatingRef.current}
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
