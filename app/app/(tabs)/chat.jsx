import { View, Text } from 'react-native'
import React from 'react'
import SafeScreen from '../../components/SafeScreen'

const chat = () => {
    return (
        <SafeScreen>
            <View>
                <Text style={{ color: 'white' }}>chat</Text>
            </View>
        </SafeScreen>

    )
}

export default chat