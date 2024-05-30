import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from 'react-native-ui-lib';
import { PickerItemProps } from 'react-native-ui-lib/src/components/picker/types';
import AntDesign from '@expo/vector-icons/AntDesign';

interface PickerComponentProps {
    items: PickerItemProps[],
    label: string,
    priority: number,
    onChange: (value: number) => void
}

const PickerComponent: React.FC<PickerComponentProps> = ({ items, label, onChange,priority }) => {
    const [values, setValues] = useState(priority)
    const handleChange = (value: any) => {
        onChange(value)
        setValues(value)
    }
    return (
        <Picker
            style={styles.selectStyles}
            topBarProps={{
                containerStyle: {
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                },
                doneLabel: "Select priority",
                title: "Priority",
                titleStyle: {
                    fontSize: 18,
                },



            }}
            value={values}
            onChange={handleChange}
            useWheelPicker={true} items={items}
            label={label}
        />
    )
}

export default PickerComponent

const styles = StyleSheet.create({
    selectStyles: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingTop: 0,
    }
})