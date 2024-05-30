import React, { useState } from 'react';
import { Checkbox } from 'react-native-ui-lib';

interface CheckboxComponentProps {
    onChange: (value: boolean) => boolean,
    isRepeating: boolean
    label: string
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ onChange, label, isRepeating }) => {
    const [repeating, setRepeating] = useState(isRepeating);
    const handleChange = (value: boolean) => {
        onChange(value)
        setRepeating(value)
    }
    return (
        <Checkbox label={label}
            value={repeating}
            onValueChange={handleChange}
        />
    )
}

export default CheckboxComponent

