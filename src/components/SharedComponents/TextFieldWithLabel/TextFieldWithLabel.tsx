import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextField } from 'react-native-ui-lib'

interface TextFieldWithLabelProps {
    label: string
    onChange: (value: string) => void
    description: string
}


const TextFieldWithLabel: React.FC<TextFieldWithLabelProps> = ({label,onChange, description}) => {
    const [fieldValue, setFieldValue] = useState(description)
    const handleChange = (value: string) => {
        setFieldValue(value)
        onChange(value)
    }
    return (
        <TextField
            fieldStyle={styles.descriptionFieldStyle}
            label={label}
            labelStyle={styles.labelStyle}
            multiline
            value={fieldValue}
            onChangeText={handleChange}
        />
    )
}

export default TextFieldWithLabel

const styles = StyleSheet.create({
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
        width: '80%', alignSelf: 'auto'
    }
});
