import React, { useState, useEffect, useContext } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { StyleSheet, Modal, Alert, View, Pressable } from "react-native"; 
import deliveryApi from "../api/deliveryapi";
import { AuthContext } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons'; 



const NewClientScreen = ({ navigation }) => {
   
    const [companyName, setCompany] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [address, setAddress] = useState("")  
    const [error, setError] = useState(false);
    const { authState} = useContext(AuthContext);


    async function postClient(){

            const response = await deliveryApi.post("/client/newClient", {
                companyName,
                cnpj,
                address
            }); 
            console.log("entrou no try") 
        
        
      }
    
    return(
        <View>
        
        <View style={styles.grid}>
            <Input 
                placeholder = "Company Name"
                style = {styles.textInput}
                onChangeText={(name) => setCompany(name)}            
            />
                        
            <Input 
                placeholder = "Cnpj"
                style = {styles.textInput}
                onChangeText={(t) => setCnpj(t)}  
                        
            />
            <Input 
                placeholder = "Address"
                style = {styles.textInput}
                onChangeText={(ad) => setAddress(ad)}  
                       
            />                 
        </View>
                    
        <Button 
            title={"Conformar"}
            color="purple"
            onPress={() => postClient()}>
        </Button>
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
    //flexDirection: 'row',
    //left: 10,
    //top: 10,   
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#f0ddee',
    borderWidth: 2,
    alignContent: "center",
    width: 330,
    height: 105,
   // marginLeft: 15,
    //marginBottom: 10,
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


export default NewClientScreen;