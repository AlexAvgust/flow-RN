import { StyleSheet } from 'react-native'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { Link, useRouter, } from 'expo-router'
import { useRoute } from '@react-navigation/native'
import MidButton from '../../../../src/components/Buttons/MidButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../src/store/store'
import { Calendar, ExpandableCalendar, WeekCalendar } from 'react-native-calendars'
const Homepage = () => {
    const router = useRouter()

    const onAddNewTaskPress = () => {
        router.push('/Home/Authorized/HomePage/NewTask')
    }
    return (
        <View style={styles.container}>
            <View gap-40 left>
                <Text marginL-20 marginB-50 style={styles.today}>Today</Text>
                <ExpandableCalendar style={{backgroundColor: 'none'}} hideKnob={true} />
            </View>
            <Link href={'/Home/Authorized/HomePage/NewTask'}>
                <MidButton onPressFunc={onAddNewTaskPress} />


            </Link>
        </View>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-evenly',
        alignItems: 'center',

    }, hiText: {
        paddingLeft:20,
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
        fontWeight: '700'
    },
})