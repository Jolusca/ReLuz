import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import Lista_Placa from '../pags_tecnico/Lista_Placas';
import Perfil_Tec from '../pags_tecnico/Perfil';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Tecnico() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5a0294ff',
          height: 80,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#5a0294ff',
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
        name="Perfil do Técnico"
        component={Perfil_Tec}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
          drawerLabel: 'Perfil do Técnico',
        }}
      />
    </Drawer.Navigator>
  );
}
