import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Home from './Home'
import { Slot, useNavigation } from 'expo-router'

const index = () => {

    return (
        <View>
            <Home />
        </View>
    )
}

export default index

const styles = StyleSheet.create({})