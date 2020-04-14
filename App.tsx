import React from 'react'
import {StyleSheet, View} from 'react-native'

export default function App() {
    return (
        <View style={styles.container}>
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
        backgroundColor: 'red',
        borderRadius: 35,
    },
})
