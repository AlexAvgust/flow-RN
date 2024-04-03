import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { View, Text, SkeletonView, ListItem, Button } from 'react-native-ui-lib'
import { Link, useRouter } from 'expo-router'
import MidButton from '../../../../src/components/Buttons/MidButton'
import { ExpandableCalendar } from 'react-native-calendars'
import moment from 'moment'
import ScreenSafeContainer from '../../../../src/components/ScreenSafeContainer/ScreenSafeContainer'
const Homepage = () => {
    const router = useRouter()
    const currentDate = moment().format('D MMMM YYYY')
    const onAddNewTaskPress = () => {
        router.push('/Home/Authorized/HomePage/NewTask')
    }
    return (
        <ScreenSafeContainer>
            <View style={styles.container}>
                <View marginB-40 gap-40 left>
                    <Text marginL-20 style={styles.today}>
                        Today, <Text style={styles.date}>{currentDate}</Text>
                    </Text>
                    <ExpandableCalendar
                        style={{ backgroundColor: 'none' }}
                        hideKnob={true}
                    />
                </View>

                <View marginB-300>
                    <ListItem
                        style={{
                            flexDirection: 'column',
                            gap: 30,
                        }}
                    >
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                        <Text grey10 text60 marginL-10>
                            The item
                        </Text>
                    </ListItem>
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
            </View>
        </ScreenSafeContainer>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
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
})
