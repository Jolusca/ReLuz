import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function Lista_Placa() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="001E1E" />
      
      <Text style={styles.title}>Lista de Placas Solares</Text>
      <Text style={styles.subtitle}>Escolha uma opção abaixo para continuar:</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Em Funcionamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Em Manuntenção</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCC',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
