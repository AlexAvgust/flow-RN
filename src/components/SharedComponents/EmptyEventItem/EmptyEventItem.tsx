import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyEventItem = () => {
    return (
        <View style={styles.emptyItem}>
            <Text style={styles.emptyItemText}>No Events Planned Today</Text>
        </View>
    )
}

export default EmptyEventItem

const styles = StyleSheet.create({
    emptyItem: {
        marginTop: 30,
        alignContent: 'center',
        paddingLeft: 20,
        height: 52,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    emptyItemText: {

        alignItems: 'center',
        fontSize: 24,
        color: '#000',
        fontWeight: '200',
    }
})