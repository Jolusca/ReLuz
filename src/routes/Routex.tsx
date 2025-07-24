import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../components/LoginScreen';
import DrawerRoutes_Usuario from './usuario.routes';
import DrawerRoutes_Tecnico from './tecnico.routes';
import { useAuth } from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Tecnico: undefined;
  Usuario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { tipo } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false
      }}>
      {tipo === 'tecnico' && (
        <Stack.Screen name="Tecnico" component={DrawerRoutes_Tecnico} />
      )}
      {tipo === 'usuario' && (
        <Stack.Screen name="Usuario" component={DrawerRoutes_Usuario} />
      )}
      {!tipo && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
}

