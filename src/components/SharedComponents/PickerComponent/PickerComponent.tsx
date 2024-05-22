import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from 'react-native-ui-lib';
import { PickerItemProps } from 'react-native-ui-lib/src/components/picker/types';

interface PickerComponentProps {
    items: PickerItemProps[],
    label: string,
    onChange: (value: number) => void
}

const PickerComponent: React.FC<PickerComponentProps> = ({ items, label, onChange }) => {
    const [values, setValues] = useState(0)
    const handleChange = (value: any) => {
        onChange(value)
        setValues(value)
    }
    return (
        <Picker
            style={styles.selectStyles}
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