import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const { height: screenHeight } = Dimensions.get('window');
const GAP = 12; // Espaço entre os botões
const TOTAL_HEIGHT = screenHeight * 0.5;
const BUTTON_HEIGHT = (TOTAL_HEIGHT - 2 * GAP) / 3;

export default function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelected(index === selected ? null : index);
  };

  const buttons = [
    { title: 'Informações do Usuário' },
    { title: 'Cadastro de Placas' },
    { title: 'Informar Mal Funcionamento' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MENU</Text>
      </View>

      <View style={[styles.buttonContainer, { height: TOTAL_HEIGHT }]}>
        {buttons.map((btn, index) => {
          const isActive = selected === index;
          const isLast = index === buttons.length - 1;

          return (
            <View
              key={index}
              style={[
                styles.shadowWrapper,
                { marginBottom: isLast ? 0 : GAP },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggle(index)}
                style={[styles.button, { height: BUTTON_HEIGHT }]}
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
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#0A0D10',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
  },
  shadowWrapper: {
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 179, 0, 0.5)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  button: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0A0D10',
  },
  buttonText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 10,
    color: '#000',
  },
});
