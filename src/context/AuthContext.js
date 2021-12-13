import React, { createContext, useReducer} from "react";
import axios from 'axios';

const AuthContext = createContext(null);

function authReducer(state,action){
 
  switch(action.type){
    case "signIn":
      return({
        ...state,
        signedIn: true,
        access_token: action.payload
      });
    case "error":
      return({
        ...state,
        error: action.payload
      });
    case "signOut":
      return({
        ...state,
        signedIn: false,
        access_token: null
      })
    default:
      return({...state});
  }
}


const AuthProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    signedIn: false,
    access_token: null,
    error: ''
  })

  const signIn = async ({username, password}) => {
    try{
      const response = await axios({
        method: 'post',
        url: 'https://ds151-api.herokuapp.com/associate/authentication',
        data:{
          cnpj: username,
          password
        }
      });
      console.log(response.data);
      dispatch({type: 'signIn', paylod: response.data.access_token});
  
    }catch(err){
      dispatch({type:'error', payload: 'Problemas para autenticar usuario'});
      console.log(err);
    }
  };
  
  return(
    <AuthContext.Provider value={{authState, signIn}}>
      {children}
    </AuthContext.Provider>
  )
};

export {AuthContext, AuthProvider}