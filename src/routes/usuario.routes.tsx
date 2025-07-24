import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import GraphScreen from '../pags_usuario/Graficos';
import Status from '../pags_usuario/Status';
import WeatherScreen from '../pags_usuario/Clima';
import Historico from '../pags_usuario/Historico';
import Perfil from '../pags_usuario/Perfil_usuario';
import { useAuth } from '../context/AuthContext';
import LogoutScreen from '../components/LogoutScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Usuario() {
  const { setTipo } = useAuth();
  
  const { tipo } = useAuth();
  
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
            backgroundColor: 'rgba(199, 158, 70, 1)',
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
      <Drawer.Screen
        name="Perfil do Usuário"
        component={Perfil}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
          drawerLabel: 'Perfil do Usuário',
        }}
      />
      <Drawer.Screen 
        name="Sair" 
        component={LogoutScreen} 
        options={{
            drawerIcon: ({ color, size }) => <Feather name="x" color={color} size={size} />,
            drawerLabel: 'Retornar ao Login',
        }}
      />

    </Drawer.Navigator>
  );
}
