import React from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import {Background} from './utils'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import Animated, {clockRunning, startClock} from 'react-native-reanimated'
import {interpolateColor, onGestureEvent, useValues} from 'react-native-redash'

const {
    cond,
    eq,
    set,
    add,
    useCode,
    block,
    interpolate,
    spring,
    and,
    not,
    Clock,
    stopClock,
} = Animated

type WithOffsetConfig = {
    gestureState: Animated.Value<State>
    translation: Animated.Value<number>
    velocity: Animated.Value<number>
}

const withSpring = ({
    gestureState,
    translation,
    velocity,
}: WithOffsetConfig) => {
    const offset = new Animated.Value(0)
    const clock = new Clock()

    const state: Animated.SpringState = {
        finished: new Animated.Value(0),
        position: new Animated.Value(0),
        time: new Animated.Value(0),
        velocity: new Animated.Value(0),
    }

    const config: Animated.SpringConfig = {
        damping: 10,
        mass: 5,
        stiffness: 150,
        overshootClamping: true,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Animated.Value(0),
    }

    const runSpring = [
        // Update the position with the distance you moved
        // your finger during the pan gesture
        set(state.position, add(state.position, translation)),

        // Get the animation ready if it's not already running
        cond(and(not(clockRunning(clock)), not(state.finished)), [
            set(config.toValue, 0),
            // Starting velocity should be the velocity our gesture ended with,
            // which results in a more natural looking start to our spring
            set(state.velocity, velocity),
            // Reset time
            set(state.time, 0),
            // Start the animation
            startClock(clock),
        ]),

        // Stop the clock when the animation finishes
        cond(state.finished, [stopClock(clock)]),

        // Tell Reanimated about our spring animation.
        // Note that this doesn't run it, but only sets it up.
        spring(clock, state, config),

        // Reset translation to stop that flashing bug we experienced.
        set(translation, 0),

        // Return state.position.
        state.position,
    ]

    // Evaluates to true if the animation is running and you begin a gesture
    const isAnimationInterrupted = and(
        clockRunning(clock),
        eq(gestureState, State.BEGAN),
    )

    return block([
        // Stop the animation if you interrupt it with a gesture
        cond(isAnimationInterrupted, stopClock(clock)),
        // Decide if we should run the animation or respond to the gesture
        cond(eq(gestureState, State.END), runSpring, [
            // Set finished to 0 so that our animation can run again
            set(state.finished, 0),
            // Return the sum of our state.position (current offset) and our gesture translation
            add(state.position, translation),
        ]),
    ])
}

export default function App() {
    const window = useWindowDimensions()

    // A utility function which creates animated values for us
    const [
        gestureState,
        translationX,
        velocityX,
        translationY,
        velocityY,
    ] = useValues([State.UNDETERMINED, 0, 0, 0, 0], [])

    const translateX = withSpring({
        gestureState,
        translation: translationX,
        velocity: velocityX,
    })

    const translateY = withSpring({
        gestureState,
        translation: translationY,
        velocity: velocityY,
    })

    // A utility to map our gesture handler values to animated values
    // Instead of us having to do Animated.event([...]) as I did in the session
    const gestureEvent = onGestureEvent({
        state: gestureState,
        translationX,
        velocityX,
        translationY,
        velocityY,
    })

    const opacity = interpolate(translateY, {
        inputRange: [window.height / -2, window.height / 2],
        outputRange: [0, 1],
    })

    const backgroundColor = interpolateColor(translateX, {
        inputRange: [window.width / -2, window.width / 2],
        outputRange: ['red', '#3c8eff'],
    })

    return (
        <View style={styles.container}>
            <Background />
            <PanGestureHandler {...gestureEvent}>
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            opacity,
                            backgroundColor,
                            transform: [
                                {
                                    translateX,
                                },
                                {
                                    translateY,
                                },
                            ],
                        },
                    ]}
                />
            </PanGestureHandler>
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
