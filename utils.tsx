import React from 'react'
import {View, Text} from 'react-native'

const YAxis = () => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: 1,
                    backgroundColor: '#d5dbdf',
                }}
            />
            <Text
                style={{
                    position: 'absolute',
                    top: 20,
                    left: '50%',
                    marginLeft: 10,
                }}
            >
                Transparent
            </Text>
            <Text
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    marginLeft: 10,
                }}
            >
                Opaque
            </Text>
        </View>
    )
}

const XAxis = () => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: 1,
                    backgroundColor: '#d5dbdf',
                }}
            />
            <Text
                style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    marginTop: 10,
                }}
            >
                Grey
            </Text>
            <Text
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    marginTop: 10,
                }}
            >
                Blue
            </Text>
        </View>
    )
}

export const Background = () => (
    <>
        <YAxis />
        <XAxis />
    </>
)
