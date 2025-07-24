import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { View } from 'react-native';



import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Routex';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;



// <Button title="Entrar como Técnico" onPress={() => setTipo('tecnico')} /> 
export default function LogoutScreen() {
    const { setTipo } = useAuth();


    setTipo(null); // Redireciona para a tela de Login
    
    return (
        <View>

        </View>
    )
}
