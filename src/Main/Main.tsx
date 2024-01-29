import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen/MainScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const Stack = createNativeStackNavigator();

export default function Main() {
    const user = useSelector((state: RootState) => state.user)
    return (
        <Stack.Navigator initialRouteName='Main'>
            {user ?
                <>

                    <Stack.Screen name="Main" component={MainScreen} />
                </>
                :
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                        headerShown: false
                    }} />
                </>
            }
        </Stack.Navigator>

    )
}