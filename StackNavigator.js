import * as React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Exchange from './Exchange';
import Details from './ReceiverDetails';

export const StackNavigator = createStackNavigator({
    Exchanges:
    {
        screen: Exchange,
        navigationOptions:
        {
            headerShown: false
        }
    },

    ReceiverDetails:
    {
        screen: Details,
        navigationOptions:
        {
            headerShown: false
        }
    },

    UserExchanges: 
    {
        screen: UserExchanges,
        navigationOptions:
        {
            headerShown: false
        }
    }
},

{
    initialRouteName: "Exchanges"
})