import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import Lista_Placa from '../pags_tecnico/Lista_Placas';
import Lista_User from '../pags_tecnico/Lista_Users';
import Perfil_Tec from '../pags_tecnico/Perfil';
import LogoutScreen from '../components/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Tecnico() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#a187c9ff',
          height: 80,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#a187c9ff',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ddd',
      }}
    >
      <Drawer.Screen
        name="Lista de Placas"
        component={Lista_Placa}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
          drawerLabel: 'Lista de Placas',
        }}
      />
            <Drawer.Screen
        name="Lista de usuários"
        component={Lista_User}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          ),
          drawerLabel: 'Lista de Usuários',
        }}
      />
      <Drawer.Screen
        name="Perfil do Técnico"
        component={Perfil_Tec}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: 'Perfil do Técnico',
        }}
      />
      <Drawer.Screen 
        name="Sair" 
        component={LogoutScreen} 
        options={{
            drawerIcon: ({ color, size }) => <Feather name="log-out" color={color} size={size} />,
            drawerLabel: 'Retornar ao Login',
        }}
      />
    </Drawer.Navigator>
  );
}
