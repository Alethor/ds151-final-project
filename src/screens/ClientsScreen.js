import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, TouchableOpacity, Alert, Pressable, View, ActivityIndicator, FlatList } from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import Ionicons from '@expo/vector-icons/Ionicons'; 



const ClientsScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function getClients(){
    const responseClients = await deliveryApi.get("/client/listAllClientsByAssociate");
    if(responseClients.data.clients){
      setClients(responseClients.data.clients);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getClients();
    
  }, []);


  async function deleteClient(id){
    await deliveryApi.delete(`/client/deleteClient?id=${id}`);  
    getClients();
  }


  if(clients.length == 0){
    return(
      <View>
        
          <Text style={{alignSelf: 'center', textAlignVertical: 'center'}}>No clients yet!</Text>
        
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='lightblue' />
          </TouchableOpacity>
      </View>
    )
  }  
  
  return(
    <View>
       <View style={styles.centeredView} >
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={loading}
          onRequestClose={() => {setLoading(!loading)}}>
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#694fad" />
              <Text style={styles.modalText} >Carregando...</Text>
            </View>
          </View>
         
         </Modal>
       </View>
       <View>
         <Button title="Novo Cliente" onPress={() => navigation.navigate("NewClient")}></Button>
       </View>
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
      </View>
      {/* <View>
          <TouchableOpacity
            style={styles.add}
            onPress={() => navigation.navigate("NewClient")}
          >  
            <Ionicons name='add-circle' size={65} color='lightblue' />
          </TouchableOpacity>
      </View> */}
    </View> 
  ) 
}
 
const styles = StyleSheet.create({


grid:{
    marginTop:10,
    marginBottom: 82
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