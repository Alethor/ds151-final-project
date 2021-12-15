import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './RootNavigation';
import ClientsScreen from './src/screens/ClientsScreen';
import DeliveredScreen from './src/screens/DeliveredScreen';
import PendingDeliveriesScreen from './src/screens/PendingDeliveriesScreen';
import CustomDrawer from './src/components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

function Deliverymen(){
  return(
    <>
      <Text>Esse � a lista de entregadores</Text>
    </>
  )
}

function Deliveries(){
  return(
   <TopTab.Navigator>
     <TopTab.Screen name="Pending" component={PendingDeliveriesScreen}></TopTab.Screen>
     <TopTab.Screen name="Delivered" component={DeliveredScreen}></TopTab.Screen>
   </TopTab.Navigator>
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
const LogoutButton = () => {
  return(
    <Text>Bot�o</Text>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={ navigationRef}>
        <Drawer.Navigator 
          drawerContent={ props => <CustomDrawer {...props} />}  
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#694fad',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333'
          }}
          initialRouteName="Login"
        >
          <Drawer.Screen name="Home" component={Home} options={{
            drawerIcon: ({ color }) => (
              <Ionicons name='home-outline' size={22} color={color} />

            )
          }}/>
          <Drawer.Screen options={{headerShown: false}} name="Login" component={LoginScreen}options={{
            drawerIcon: ({ color }) => (
              <Ionicons name='log-in-outline' size={22} color={color} />

            )
          }}/>
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
