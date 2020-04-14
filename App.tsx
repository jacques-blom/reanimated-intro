import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Background} from './utils'

export default function App() {
    return (
        <View style={styles.container}>
            <Background />
            <View style={styles.dot} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 70,
        height: 70,
        backgroundColor: '#3C8EFF',
        borderRadius: 35,
    },
})
