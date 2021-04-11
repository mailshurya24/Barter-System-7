import * as React from 'react';
import {Text, View, Card, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import AppHeader from './Header';

export default class Details extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            item: this.props.navigation.getParam('details')['Item'],
            itemDescription: this.props.navigation.getParam('details')['Description'],
            receiverID: this.props.navigation.getParam('details')['User'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            exchangeDocID: ''
        }
    }

    getUserDetails = () =>
    {
        db.collection("Users").where("EmailIdentity","==",this.state.receiverID).get()
        .then((Snapshot)=>
        {
            Snapshot.forEach((doc)=>
            {
                this.setState({
                    receiverName: doc.data().FirstName,
                    receiverContact: doc.data().ContactDetails,
                    receiverAddress: doc.data().Address,
                    exchangeDocID: this.createUniqueID()
                })
            })
        })
    }

    addExchange = () =>
    {
        db.collection("MyExchanges").add({
            User: this.state.userID,
            Item: this.state.item,
            ItemDescription: this.state.itemDescription,
            ExchangeID: this.state.exchangeDocID,
            ReceiverName: this.state.receiverName,
            ReceiverContact: this.state.ReceiverContact,
            ReceiverAddress: this.state.receiverAddress,
            ExchangeStatus: 'Interested'
        })
    }

    createUniqueID = () =>
    {
        Math.random().toString(36).substring(7);
    }

    render()
    {
        return(
            <View>
                <View>
                    <Card>
                        <Text>Name: {this.state.receiverName}</Text>
                        <Text>Address: {this.state.receiverAddress}</Text>
                        <Text>Contact Details: {this.state.receiverContact}</Text>
                    </Card>
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('MyExchanges');
                                                      this.addExchange();}}>
                        <Text>Exchange</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}