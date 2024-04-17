import { Link, useRouter } from 'expo-router'
import moment from 'moment'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Button, Text, View } from 'react-native-ui-lib'
import HomeScreenCalendar from '../../../../src/components/HomeScreenComponents/HomeScreenCalendar/HomeScreenCalendar'
import ScreenSafeContainer from '../../../../src/components/SharedComponents/ScreenSafeContainer/ScreenSafeContainer'


const Homepage = () => {
    const router = useRouter()
    const currentDate = moment().format('D MMMM YYYY')
    const onAddNewTaskPress = () => {
        router.push('/Home/Authorized/HomePage/NewTask')
    }

    return (
        <ScreenSafeContainer>
            <ScrollView contentContainerStyle={styles.container}>
                <View marginB-40 gap-40 left>
                    <Text marginL-20 style={styles.today}>
                        Today, <Text style={styles.date}>{currentDate}</Text>
                    </Text>
                    <View >
                        <HomeScreenCalendar />
                    </View>
                </View>


                <Link
                    style={{ justifyContent: 'center' }}
                    href={'/Home/Authorized/HomePage/NewTask'}
                >
                    <Button
                        onPress={onAddNewTaskPress}
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
                </Link>
            </ScrollView>
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
