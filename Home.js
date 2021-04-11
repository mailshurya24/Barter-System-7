import * as React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import Request from './Request';
import AppHeader from './Header';
import { FlatList } from 'react-navigation';

export default class Home extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            allRequests: []
        }
    }

    getRequests = () =>
    {
        this.requestRef = db.collection("Items").onSnapshot((Snapshot)=>{
            var itemsList = Snapshot.docs.map((item)=>{item.data()});
            this.setState({allRequests: itemsList})
        })
    }

    renderItem = (item, index) =>
    {
        <ListItem
            key = {index}
            title = {item.Item}
            subTitle = {item.Description}
            rightElement = {<TouchableOpacity onPress = {()=>{this.props.navigation.navigate("ReceiverDetails"),
                                                              {'details': item}  }}>
                                <Text>View</Text>
                            </TouchableOpacity>
                           }
            bottomDivider
        />
        
    }
    
    componentDidMount = () =>
    {
        this.getRequests();
    }

    render()
    {
        return(
            <View>
                <View>
                    <AppHeader title = "Active Exchanges" color = "#66C1B3"/>
                </View>

                <View>
                    <KeyboardAvoidingView>
                        {this.state.allRequests.length === 0}
                        ? (<View><Text>No active exchanges</Text></View>)
                        : (<FlatList
                                keyExtractor = {(index)=>index.toString()}
                                data = {this.state.allRequests}
                                renderItem = {this.renderItem()}
                          />)
                    </KeyboardAvoidingView>
                </View>
            </View>


        )
    }
}