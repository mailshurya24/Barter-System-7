import * as React from 'react';
import {Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {DrawerItems, createDrawerNavigator} from 'react-navigation-drawer';
import firebase from 'firebase';
import db from './Config';
import Welcome from './Welcome';
import Home from './Home';
import Feedback from './Feedback';
import Exchange from './Exchange'
import AppHeader from './Header';
import Settings from './Settings';
import SideMenu from './SideMenu';
import UserExchanges from './UserExchanges';

export default class App extends React.Component
{
  render()
  {
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: {screen: Home},
  Exchange: {screen: Exchange},
  Feedback: {screen: Feedback}
},

{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: () =>
    {    
      const routeName = navigation.state.routeName;
      //console.log(routeName);

      if(routeName === "Home")
      {
        return(
          <Image
            source = {{uri: "https://i.pinimg.com/originals/46/cb/a9/46cba9f93a3d437db6d42f4bcd1a5f5f.gif"}}
          />
        )
      }
      else if(routeName === "Exchange")
      {
        <Image
          source = {require("./assets/WelcomeImage")}
        />
      }
      else if(routeName === "Feedback")
      {
        <Image
          source = {{uri: "https://i.gifer.com/M12x.gif"}}
        />
      }
    }
  })
})

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {screen: TabNavigator},
    Exchange: {screen: TabNavigator},
    Feedback: {screen: TabNavigator},
    Settings: {screen: Settings},
    UserExchanges: {screen: UserExchanges}
  },
  {
    contentComponent: SideMenu
  },
  {
    initialRouteName: "Home"
  }
)

const SwitchNavigator = createSwitchNavigator({
  Welcome: {screen: Welcome},
  Drawer: {screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);