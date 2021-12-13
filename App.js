import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './RootNavigation';
import ClientsScreen from './src/screens/ClientsScreen';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();


function Deliverymen(){
  return(
    <>
      <Text>Esse é a lista de entregadores</Text>
    </>
  )
}

function Deliveries(){
  return(
    <>
      <Text>Esse é a lista de entregas</Text>
    </>
  )
}


function Home(){
  return(
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Deliveries') {
            iconName = focused
              ? 'ios-paper-plane'
              : 'ios-paper-plane-outline';
          }else if (route.name === 'Deliverymen'){
            iconName = focused
              ? 'ios-bicycle'
              : 'ios-bicycle-outline';
          } else if( route.name === 'Clients'){
            iconName = focused
              ? 'ios-people'
              : 'ios-people-outline';
          }

          size = 20;
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen name="Deliveries" component={Deliveries} />
      <Tab.Screen name="Deliverymen" component={Deliverymen} />
     

    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={ navigationRef}>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Login" component={LoginScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
