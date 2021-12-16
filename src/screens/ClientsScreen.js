import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, TouchableOpacity, Alert, Pressable, View, ActivityIndicator, FlatList } from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Ionicons from '@expo/vector-icons/Ionicons'; 



const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  
  async function getClients(){
    const responseClients = await deliveryApi.get("/client/listAllClientsByAssociate");
    if(responseClients.data.clients){
      setClients(responseClients.data.clients);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getClients();
    });

  }, []);


  async function deleteClient(id){
    try{
      await deliveryApi.delete(`/client/deleteClient?id=${id}`);  
      getClients();
    }catch(e){
      console.log(e);
    }
    
  }


  if(clients.length == 0){
    return(
      <View>
        
          <Text style={{alignSelf: 'center', textAlignVertical: 'center'}}>No clients yet!</Text>
        
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='orange' />
          </TouchableOpacity>
      </View>
    )
  }  
  
  return(
    <View style={styles.container}>
      <View style={styles.grid}>
        <FlatList
          data={clients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(              
              	<View style={styles.containerView}>
                  <View style={styles.containerTouchable}>
                    <TouchableOpacity onPress={() => {}}>
                      <Text style={styles.textLabel}>{item.companyName}</Text>
                      <Text style={styles.textContent}>Address: {item.address}</Text>  
                      <Text style={styles.textContent}>CNPJ: {item.cnpj}</Text>               
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.remove}
                    onPress={() => deleteClient(item.id)}
                  >  
                    <Ionicons name='trash-outline' size={35} color='black' />
                  </TouchableOpacity>
                </View>
            )
          }}
        >
        </FlatList>
        <View>
          <TouchableOpacity
            style={styles.add1}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='orange' />
          </TouchableOpacity>
      </View> 
      </View>
      
     
    </View> 
  ) 
}
 
const styles = StyleSheet.create({


grid:{
    marginTop:10,
    marginBottom: 100
},

bottom: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 36
},
container:{
  flex: 1,
},
containerView:{
    flex: 1,
    alignSelf: 'center',
    marginTop: 10,   
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#f0ddee',
    borderWidth: 2,
    alignContent: "center",
    width: 400,
    height: 105,

},

containerTouchable:{
  marginRight: 50,
},

remove:{
  alignSelf: 'flex-end',
  marginTop: -55,
},

add:{
  marginTop:470,
  marginLeft:300

},

add1:{
  alignItems: 'flex-end',

},
textLabel:{
    fontSize: 16,
    fontWeight: 'bold', 
    marginLeft: 10,
    color: '#803790'

},

textContent:{
    marginTop: 10,
    marginRight: 80,
    marginLeft: 10,
    fontSize: 13,
},

centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},

viewAviso:{
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
},
});


export default ClientsScreen;