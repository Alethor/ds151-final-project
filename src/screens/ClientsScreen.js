import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, Pressable, View, ActivityIndicator, FlatList } from "react-native"; 
import deliveryApi from "../api/deliveryapi"; 




const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([])
  
  useEffect(() => {
    async function getClients(){
      const responseClients = await deliveryApi.get("/client/listAllClientsByAssociate");
      setClients(responseClients.data);
    }

    getClients();
    
  }, []);

  
  
  return(
    <>
      <FlatList>
        
      </FlatList>
    </>
  
  )
  
}

const styles = StyleSheet.create({
 
});

export default ClientsScreen;