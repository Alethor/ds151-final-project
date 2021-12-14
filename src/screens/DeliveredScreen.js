import React, { useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, Pressable, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native"; 
import deliveryApi from "../api/deliveryapi"; 





const DeliveredScreen = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getDeliveries(){
    const response = await deliveryApi.get("/delivery/listAllDelivered");
    if(response.data.deliveries){
      setDeliveries(response.data.deliveries);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDeliveries();
  }, []);


  if(deliveries.length == 0){
    return(
      <View>
        <Text styles={styles.textView}>No peding deliveries yet!</Text>
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
        <FlatList
          data={deliveries}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(
              
              	<View style={styles.containerView}>
                <TouchableOpacity style={styles.container} onPress={() => {}}>
                  <Text style={styles.textLabel}>Descrição:</Text>
					        <Text style={styles.textContent}>{item.description}</Text>
                  <Text style={styles.textLabel}>Valor</Text>
                  <Text style={styles.textContent}>{item.value}</Text>
                  <Text style={styles.textLabel}>Data</Text>
                  <Text style={styles.textContent}>{item.deliveredAt}</Text>
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
  container:{
    flex: 1,
  },
  containerView:{
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e1e2e3',
    alignContent: "center",
    width: 390,
    height: 200,
    margin: 10,
    
  },
  itemView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
  },
  textLabel:{
    fontWeight: "bold",
    fontSize: 15,    
    flex: 1,
  },
  textContent:{
    fontSize: 15,
    flex: 1,
  },
  textView:{
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DeliveredScreen;