
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import SvgLogo from '../../components/SvgLogo/SvgLogo';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/slices/userSlice';
// import { Icon } from 'react-native-vector-icons/Icon';

export default function WelcomeScreen() {
    const dispatch = useDispatch()
    const onGoogleLoginPress = async () => {
        Linking.addEventListener('url', (event) => {
            const decodedUserData = decodeURIComponent(event.url.split('?user=')[1]);
            dispatch(addUser(JSON.parse(decodedUserData).user))
        })
        const redirectUrl = await WebBrowser.openAuthSessionAsync('https://ttl-18h-arp5llfpba-uc.a.run.app/auth')
        if (redirectUrl.type === 'success') {
            const decodedUserData = decodeURIComponent(redirectUrl.url.split('?user=')[1]);
            dispatch(addUser(JSON.parse(decodedUserData).user))
        }

    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>WELCOME TO</Text>
                <SvgLogo color="#fff" />
                <TouchableOpacity onPress={onGoogleLoginPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {/* <Icon name="logo-google" size={30} color="#fff" /> */}
                            <Text style={{ marginLeft: 200 }}>Login with Google!</Text>
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
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
});