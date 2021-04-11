import * as React from 'react';
import {Text, View, Card, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal, FlatList} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import AppHeader from './Header';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

export default class UserExchanges extends React.Component
{
    constructor()
    {
        super();
        this.state =
        {
            userID: firebase.auth().currentUser.email,
            allExchanges: []
        }
    }

    getExchanges = () =>
    {
        var databaseRefer = db.collection("MyExchanges").where("User", "==", this.state.userID)
        .onSnapshot((Snapshot)=>{
            var allExchanges = Snapshot.docs.map((doc)=>{
                doc.data();
            })

            this.setState({allExchanges: allExchanges})
        })
    }

    renderItem = (item, index) =>
    {
        <ListItem
            key = {index}
            title = {item.Item}
            subtitle = {item.ReceiverName}
            rightElement = {<TouchableOpacity onPress = {()=>{/*function*/}}><Text>EXCHANGE</Text></TouchableOpacity>}
        />
    }

    render()
    {
        return(
            <View>
                <View>
                    <AppHeader title = 'My Exchange' color = '66C1B3'/>
                </View>

                <View>
                    {this.state.allExchanges.length === 0}
                    ?(<View><Text>List of all Items</Text></View>)
                    :(<FlatList
                        keyExtractor = {(index)=>{index.toString()}}
                        data = {this.state.allExchanges}
                        renderItem = {this.renderItem()}
                    />)
                </View>
            </View>
        )
    }
}