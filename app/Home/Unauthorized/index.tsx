import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useDispatch } from 'react-redux'

import SvgLogo from '../../../src/components/SvgLogo/SvgLogo'
import { addUser } from '../../../src/store/slices/userSlice'


export default function Unauthorized() {
    const dispatch = useDispatch()
    const onGoogleLoginPress = async () => {
        Linking.addEventListener('url', (event) => {
            const decodedUserData = decodeURIComponent(
                event.url.split('user=')[1]
            )
            dispatch(addUser(JSON.parse(decodedUserData).user))
        })
        const redirectUrl = await WebBrowser.openAuthSessionAsync(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth`
        )
        if (redirectUrl.type === 'success') {
            const decodedUserData = decodeURIComponent(
                redirectUrl.url.split('user=')[1]
            )
            dispatch(addUser(JSON.parse(decodedUserData).user))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>WELCOME TO</Text>
                <SvgLogo color="#fff" />
                <TouchableOpacity onPress={onGoogleLoginPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {/* <Icon name="logo-google" size={30} color="#fff" /> */}
                            <Text style={{ marginLeft: 200 }}>
                                Login with Google!
                            </Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 50,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10,
    },
    resultText: {
        color: '#fff',
        fontSize: 20,
    },
})
