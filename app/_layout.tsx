import React from 'react';
import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from './CustomDrawerContent'; // ajuste o caminho se necessário

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#0A0D10' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#facc15',
        drawerInactiveTintColor: '#ccc',
        drawerStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Início',
          title: 'Início',
        }}
      />
    </Drawer>
  );
}