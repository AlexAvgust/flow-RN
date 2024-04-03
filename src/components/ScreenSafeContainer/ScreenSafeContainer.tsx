import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { View } from 'react-native-ui-lib'

interface ScreenSafeContainer {
    children: React.ReactNode
}

const ScreenSafeContainer: React.FC<ScreenSafeContainer> = ({
    children: children,
}) => {
    return <View style={styles.container}>{children}</View>
}

export default ScreenSafeContainer

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
})
