import * as React from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import {AppHeader} from './Header';
import db from './Config';

export default class Settings extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            emailID: '',
            firstNameChanged: '',
            LastNameChanged: '',
            contactDetailsChanged: '',
            addressChanged: '',
            docID: ''
        }
    }

    getUserDetails = () =>
    {
        var user = firebase.auth().currentUser();
        var email = user.email;
        db.collection("Users").where('EmailIdentity',"==",email).get()
        .then((Snapshot)=>{Snapshot.forEach(doc=>{
            var data = doc.data();
            this.setState({
                emailID: data.EmailIdentity,
                firstNameChanged: data.FirstName,
                LastNameChanged: data.LastName,
                contactDetailsChanged: data.ContactDetails,
                addressChanged: data.Address,
                docID: doc.id
            })
        })})
    }

    updateUserDetails = () =>
    {
        db.collection("Users").doc(this.state.docID).update({
            "FirstName": this.state.firstNameChanged,
            "LastName": this.state.LastNameChanged,
            "ContactDetails": this.state.contactDetailsChanged,
            "Address": this.state.addressChanged
        });

        alert("Profile updated successfully!");
    }

    componentDidMount = () =>
    {
        this.getUserDetails();
    }

    render()
    {
        return(
            <View>
                <View>
                <AppHeader title = 'Settings' color = '66C1B3'/>
                </View>

                <View>
                    <TextInput
                        placeholder = "First Name"
                        value = {this.state.firstNameChanged}
                        onChangeText = {(text)=>{this.setState({firstNameChanged: text})}}
                    />

                    <TextInput
                        placeholder = "Last Name"
                        value = {this.state.LastNameChanged}
                        onChangeText = {(text)=>{this.setState({LastNameChanged: text})}}
                    />

                    <TextInput
                        placeholder = "Contact Details"
                        value = {this.state.contactDetailsChanged}
                        keyboardType = 'numeric'
                        onChangeText = {(text)=>{this.setState({contactDetailsChanged: text})}}
                    />

                    <TextInput
                        placeholder = "Address"
                        value = {this.state.addressChanged}
                        multiline = {true}
                        onChangeText = {(text)=>{this.setState({addressChanged: text})}}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.updateUserDetails()}}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}