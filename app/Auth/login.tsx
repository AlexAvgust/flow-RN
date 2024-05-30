import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgLogo from '../../src/components/SharedComponents/SvgLogo/SvgLogo';

import { usePathname } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuthHooks';



const Login = () => {
    const path = usePathname()
    console.log('path', path)
    const { login } = useAuth()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={styles.text}>WELCOME TO</Text>
                <SvgLogo color="#fff" />
                <TouchableOpacity onPress={login}>
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

export default Login

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
