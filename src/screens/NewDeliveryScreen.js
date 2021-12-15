import React, { useState, useEffect } from 'react';
import {Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, Pressable, View, ActivityIndicator, FlatList, Text } from "react-native"; 
import deliveryApi from "../api/deliveryapi"; 
import SelectDropdown from 'react-native-select-dropdown'




const NewDeliveryScreen = ({ navigation }) => {
  const [deliverymen, setDeliverymen] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [selectedDeliveryman, setSelectedDeliveryman] = useState({});
  const [erro, setErro] = useState(false);
  const [msgErro, setMsgErro] = useState('');

  const getClients = async () => {
    let response = await deliveryApi.get("/client/listAllClientsByAssociate");
    if(response){
      setClients(response.data.clients);
    }
    console.log(clients);
  }
  const getDeliverymen = async () => {
    let response = await deliveryApi.get("/deliveryman/listAllDeliveryMenByAssociate");
    if(response){
      setDeliverymen(response.data.deliveryMen);
    }
    console.log(deliverymen)
  }

  useEffect(() => {
    getClients(); 
    getDeliverymen();
  },[]);

    return(
      <View>
        <View>
          <Text style={styles.textLabel}>Client</Text>
          <SelectDropdown
            buttonStyle={styles.selectComponent}
            buttonTextStyle={styles.textButton}
	          data={clients}
	          onSelect={(selectedItem, index) => {
	           setSelectedClient(selectedItem)
          	}}
	          buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem.companyName
          	}}
          	rowTextForSelection={(item, index) => {
		          return item.companyName
	          }}
          />    
          <Text style={styles.textLabel}>Deliveryman</Text>
          <SelectDropdown
            buttonStyle={styles.selectComponent}
            buttonTextStyle={styles.textButton}
	          data={deliverymen}
	          onSelect={(selectedItem, index) => {
	            	setSelectedDeliveryman(selectedItem)
          	}}
	          buttonTextAfterSelection={(selectedItem, index) => {
		          return selectedItem.name
          	}}
          	rowTextForSelection={(item, index) => {
		          return item.name
	          }}
          />  
        </View>
        <View>
          <Text>{selectedClient.companyName}</Text>
          <Text>{selectedDeliveryman.name}</Text>
        </View>
      </View>
    )

  
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  selectComponent:{
    borderWidth: 1.5,
    borderRadius: 20,
    borderColor: 'orange',
    width: 250,
    height: 35,

  },  
  textButton:{
    fontSize: 15,

  },
  textLabel:{
    fontSize: 15,
    fontWeight: 'bold',

  },

});

export default NewDeliveryScreen;