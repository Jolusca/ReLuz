import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!tipo ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : tipo === 'tecnico' ? (
          <Stack.Screen name="Tecnico" component={DrawerRoutes_Tecnico} />
        ) : (
          <Stack.Screen name="Usuario" component={DrawerRoutes_Usuario} />
        )}
      </Stack.Navigator>
   
  );
}
