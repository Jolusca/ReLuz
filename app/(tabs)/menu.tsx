// app/(tabs)/MenuScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function MenuScreen() {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelected(index === selected ? null : index);
  };

  const buttons = [
    { title: 'Informações do Usuário' },
    { title: 'Cadastro de Placas' },
    { title: 'Informar Mal Funcionamento' }
  ];

  const buttonColors = ['#FFAD00', '#FFC341', '#FEDE97']; // cores fixas por botão

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      {buttons.map((btn, index) => {
        const isActive = selected === index;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggle(index)}
            activeOpacity={0.9}
            style={[
              styles.button,
              {
                flex: isActive ? 4 : 2,
                backgroundColor: buttonColors[index], // cor fixa
              }
            ]}
          >
            <Text style={styles.buttonText}>{btn.title}</Text>
            {isActive && (
              <TextInput
                placeholder="Digite aqui..."
                style={styles.input}
                placeholderTextColor="#333"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#222',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 10,
  },
});
