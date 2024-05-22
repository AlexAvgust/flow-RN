import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native-ui-lib'
import { AgendaEntry } from 'react-native-calendars'
import { Task } from '../../../types/TaskType'

interface AgendaListItemProps {
    reservation: AgendaEntry
}

const AgendaListItem: React.FC<AgendaListItemProps> = ({reservation}) => {
    return (
        <TouchableOpacity
            style={[styles.item, { height: reservation.height }]}
            onPress={() => Alert.alert(reservation.name)}>
            <Text>{reservation.name}</Text>
        </TouchableOpacity>
    )
}

export default memo(AgendaListItem) 

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    customDay: {
        margin: 10,
        fontSize: 24,
        color: 'green'
    },
    dayItem: {
        marginLeft: 34
    }
});