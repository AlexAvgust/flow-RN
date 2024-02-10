import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/store/store'
import { Slot, router, useNavigation } from 'expo-router'

const Home = () => {
    const user = useSelector((state: RootState) => state.user)
    const navigation = useNavigation()
    useEffect(() => {
        if (!!user) {
            //@ts-ignore
            navigation.navigate('Home', { screen: 'Authorized' });
        } else {
            //@ts-ignore
            navigation.navigate('Home', { screen: 'Unauthorized' });
        }
    }, [user, navigation]);

    return (
        <View>
            <Slot />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})