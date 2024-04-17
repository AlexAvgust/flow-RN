import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import ScreenSafeContainer from '../../../../src/components/SharedComponents/ScreenSafeContainer/ScreenSafeContainer'

const Schedule = () => {
    return (
        <ScreenSafeContainer>

        <View>
                <CalendarList
                    pastScrollRange={6}
                    futureScrollRange={24}
                    staticHeader={true}
                    showScrollIndicator={true}
                >

                </CalendarList>
        </View>
        </ScreenSafeContainer>
    )
}

export default Schedule

const styles = StyleSheet.create({})
