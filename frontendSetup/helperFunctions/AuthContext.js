import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();

    useEffect(() => {
        async function loadToken() {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken !== null) {
                    setToken(storedToken);
                }
            }catch (error) {
                console.error('Error loading token:', error);
            }
        }
        loadToken();
    }, []);

    const storeToken = async (newToken) => {
        try {
            await AsyncStorage.setItem('token', newToken);
            setToken(newToken);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.setItem('token', " ");
            setToken("");
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, storeToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};