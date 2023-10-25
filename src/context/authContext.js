import React, {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    })
axios.defaults.baseURL= 'http://192.168.1.2:3000/api/v1'
    useEffect(() => {
        const loadStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state, user:loginData?.user, token: loginData?.token}) 
        }
        loadStorageData()
    }, []);
    return (
        <AuthContext.Provider value={{state, setState}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}