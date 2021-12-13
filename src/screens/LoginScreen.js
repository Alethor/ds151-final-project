import React, { useContext, useState, useEffect } from 'react';
import { Text, Input, Button} from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';



const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authState, signIn} = useContext(AuthContext);
  

  return(
    <>
       <Input
        placeholder="cnpj"
        onChangeText={(value) => setUsername(value)}
        value={username}
      />
      <Input
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {
          signIn({username, password})
        }}
      />

  
    </>
  )
}

export default LoginScreen;