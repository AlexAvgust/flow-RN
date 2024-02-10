import { Tabs } from 'expo-router'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function _layout() {
    return (
        <Tabs screenOptions={{
            tabBarItemStyle: {
                padding: 5
            }
        }}>
            <Tabs.Screen name="HomePage" options={{
                tabBarIcon: () => <AntDesign name="home" size={22} color="black" />,
                tabBarLabel: 'Home'
            }} />
            <Tabs.Screen name="Schedule" options={{
                tabBarIcon: () => <MaterialIcons name="schedule" size={22} color="black" />,
            }} />
            <Tabs.Screen name="Profile"
                options={{
                    tabBarIcon: () => <Octicons name="person" size={22} color="black" />,
                }} />
            <Tabs.Screen name="Settings" options={{
                tabBarIcon: () => <Ionicons name="settings-outline" size={22} color="black" />,
            }} />

        </Tabs>
    )
}

