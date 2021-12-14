import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, TouchableOpacity, Alert, Pressable, View, ActivityIndicator, FlatList } from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Ionicons from '@expo/vector-icons/Ionicons'; 


const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState(false);
  
  useEffect(() => {
    async function getClients(){
      const responseClients = await deliveryApi.get("/client/listAllClientsByAssociate");
      if(responseClients.data.clients){
        setClients(responseClients.data.clients);
      }
      setLoading(false);
    }

    getClients();
    
  }, []);


  if(clients.length == 0){
    return(
      <View>
        <Text styles={styles.textView}>No clients yet!</Text>
      </View>
    )
  }  
  
  return(
    <View>
      
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
                    onPress={() => {setRemove(true)}}
                  >  
                    <Ionicons name='trash-outline' size={35} color='black' />
                  </TouchableOpacity>
                </View>
            )
          }}
        >
        </FlatList>
      </View>
    </View>
  
  
  )
  
}
 
const styles = StyleSheet.create({


grid:{
    marginTop:10,
    marginBottom: 82
},

containerView:{
    
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#f0ddee',
    borderWidth: 2,
    alignContent: "center",
    width: 330,
    height: 105,
    marginLeft: 15,
    marginBottom: 10,
},

containerTouchable:{
  marginRight: 50,
},

remove:{
  marginLeft: 250,
  marginTop: -55,
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
