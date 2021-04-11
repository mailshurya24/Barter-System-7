import * as React from 'react';
import {View, Text, Stylesheet, TouchableOpacity, Component, Touchable, TouchableOpacityBase} from 'react-native';
import firebase from 'firebase';

export default class SideMenu extends React.Component
{
    render()
    {
        return(
            <View>
                <View>
                    <DrawerItems {...this.props}/>
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("Home")}}>
                        <Text>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("Exchange")}}>
                        <Text>Exchanges</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("Feedback")}}>
                        <Text>Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("UserExchanges")}}>
                        <Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("Welcome"); 
                                                      firebase.auth().signOut();}}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}