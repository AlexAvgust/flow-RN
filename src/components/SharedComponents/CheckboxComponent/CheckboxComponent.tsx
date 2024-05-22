import React, { useState } from 'react';
import { Checkbox } from 'react-native-ui-lib';

interface CheckboxComponentProps {
    onChange: (value: boolean) => boolean,
    label: string
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ onChange,label }) => {
    const [repeating, setRepeating] = useState(false);
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

