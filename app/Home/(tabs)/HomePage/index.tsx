import { useFocusEffect, usePathname, useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-ui-lib'
import { useDispatch } from 'react-redux'
import CalendarWithAgenda from '../../../../src/components/HomeScreenComponents/CalendarWithAgenda/CalendarWithAgenda'
import ButtonWithStates from '../../../../src/components/SharedComponents/ButtonWithStates/ButtonWithStates'
import ScreenSafeContainer from '../../../../src/components/SharedComponents/ScreenSafeContainer/ScreenSafeContainer'
import { setCurrentlySelectedDate, setSelectedTask } from '../../../../src/store/slices/taskSlice'
import { formatCurrentDateToReadableString, formatDateToYMD } from '../../../../src/utils/dateHelpers'



const Homepage = () => {
    const path = usePathname()
    const dispatch = useDispatch();
    const router = useRouter()
    console.log('path', path)
    const currentDate = formatCurrentDateToReadableString()
    const dateRef = useRef(formatDateToYMD())
    const onAddNewTaskPress = () => {
        dispatch(setCurrentlySelectedDate(dateRef.current))
        router.push(`${path}/newTask`)
    }
    useFocusEffect(() => {
        dispatch(setSelectedTask(null))
    })

    return (
        <ScreenSafeContainer>
            <View style={styles.container}>
                <View style={{ height: 780 }} marginB-40 gap-40 left>
                    <Text marginL-20 style={styles.today}>
                        Today, <Text style={styles.date}>{currentDate}</Text>
                    </Text>
                    <CalendarWithAgenda dateRef={dateRef} />
                </View>
                <ButtonWithStates label='Add new task' onPressFunc={onAddNewTaskPress} />
            </View>
        </ScreenSafeContainer>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 30,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    hiText: {
        paddingLeft: 20,
        fontSize: 26,
        fontWeight: '700',
        color: '#000',
    },
    userText: {
        fontSize: 20,
        color: '#666666',
    },
    today: {
        fontSize: 24,
        color: '#000',
        fontWeight: '700',
    },
    date: {
        fontSize: 24,
        color: '#000',
        fontWeight: '200',
    },
    calendarWithAgendaContainer: {
        height: 250
    }
})
