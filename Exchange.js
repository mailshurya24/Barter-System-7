import * as React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import AppHeader from './Header';

export default class Donate extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            item: '',
            itemDescription: '',
            uniqueId: ''
        }
    }

    addItem = () =>
    {
        var exchangeId = this.createUniqueID();
        db.collection("Items").add({
            User: this.state.userID,
            Item: this.state.item,
            Description: this.state.itemDescription,
            ExchangeID: exchangeId
        })

        alert("Item Added Successfully", 'Rate Us!', [{text: "OK", onPress = () =>
        {this.props.navigation.navigate("Feedback")}}])
    };

    createUniqueID = () =>
    {
        Math.random().toString(36).substring(7);
    }

    render()
    {
        return(
            <View>
                <View>
                    <AppHeader title = "Exchange" color = "#66C1B3"/>
                </View>

                <View>
                    <TextInput
                        placeholder = "Item Name"
                        value = {this.state.item}
                        onChangeText = {(text)=>{
                            this.setState({item: text})
                        }}
                    />

                    <TextInput
                        placeholder = "Item Description"
                        value = {this.state.itemDescription}
                        multiline = {true}
                        onChangeText = {(text)=>{
                            this.setState({itemDescription: text})
                        }}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.addItem()}}>
                        <Text>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}