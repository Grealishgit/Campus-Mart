import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

const TopHeader = () => {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>Hi there! 👋</Text>
                <Text style={styles.headerSubText}>What are you looking for today?</Text>
            </View>
            <TouchableOpacity style={styles.profileButton} onPress={() => { router.push('/settings') }}>
                <FontAwesome5 name="user-astronaut" size={20} color="black" />
            </TouchableOpacity>


        </View>
    )
}

export default TopHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginTop: 10,
        marginBottom: 20
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    headerSubText: {
        fontSize: 15,
        color: 'gray'
    },
    profileButton: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#155dfc',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
});