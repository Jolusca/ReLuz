import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import GraphScreen from '../pags_usuario/Graficos';
import Status from '../pags_usuario/Status';
import WeatherScreen from '../pags_usuario/Clima';
import Historico from '../pags_usuario/Historico';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Usuario() {
  return (
        <Drawer.Navigator
        screenOptions={{
            headerStyle: {
            backgroundColor: '#c79e46ff',
            height: 80,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            drawerStyle: {
            backgroundColor: '#c79e46ff',
            },
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#ddd',
        }}
        >
      <Drawer.Screen
        name="Painel Geral"
        component={GraphScreen}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="bar-chart-2" color={color} size={size} />,
          drawerLabel: 'Painel Geral',
        }}
      />
      <Drawer.Screen
        name="Status Placas"
        component={Status}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="zap" color={color} size={size} />,
          drawerLabel: 'Status Placas',
        }}
      />
      <Drawer.Screen
        name="Radiação Solar"
        component={WeatherScreen}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="sun" color={color} size={size} />,
          drawerLabel: 'Radiação Solar',
        }}
      />
      <Drawer.Screen
        name="Histórico Geral"
        component={Historico}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="book-open" color={color} size={size} />,
          drawerLabel: 'Histórico Geral',
        }}
      />
    </Drawer.Navigator>
  );
}
