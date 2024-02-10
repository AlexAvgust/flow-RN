import React from 'react'
import { Button } from 'react-native-ui-lib'

interface MidButtonProps {
    onPressFunc: () => void
}

export default function MidButton({ onPressFunc }: MidButtonProps) {
    return (
        <Button
            onPress={onPressFunc}
            size={Button.sizes.medium}
            label="Add new task"
            backgroundColor="#000"
            color="#fff"

            outlineColor="#000"
            outlineWidth={2}

            activeBackgroundColor="#000"
            activeOpacity={0.6}
            style={{
                borderWidth: 1,
                paddingVertical: 12,
                paddingHorizontal: 24,
            }}
        />
    )
}