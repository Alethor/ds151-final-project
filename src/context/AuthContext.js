import React, { createContext, useReducer} from "react";
import axios from 'axios';

const AuthContext = createContext(null);

function authReducer(state,action){
 
  switch(action.type){
    case "signIn":
      return({
        ...state,
        signedIn: true,
        error: false,
        access_token: action.payload
      });
    case "error":
      return({
        ...state,
        error: true,
        errorMsg: action.payload
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
    error: false,
    errorMsg: ''
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

      dispatch({type: 'signIn', paylod: response.data.access_token});

    }catch(err){
      console.log("Entrei no catch")
      dispatch({type:'error', payload: 'Problemas para autenticar usuario, por favor, tente novamente!'});

    }
  };
  
  return(
    <AuthContext.Provider value={{authState, signIn}}>
      {children}
    </AuthContext.Provider>
  )
};

export {AuthContext, AuthProvider}