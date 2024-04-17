import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/store/store'
import { useNavigation } from 'expo-router'

const Home = () => {
    const user = useSelector((state: RootState) => state.user.user)
    const navigation = useNavigation()
    useEffect(() => {
        if (Boolean(user)) {
            //@ts-ignore
            navigation.navigate('Home', { screen: 'Authorized' })
        } else {
            //@ts-ignore
            navigation.navigate('Home', { screen: 'Unauthorized' })
        }
    }, [user, navigation])

    return <></>
}

export default Home

const styles = StyleSheet.create({})
