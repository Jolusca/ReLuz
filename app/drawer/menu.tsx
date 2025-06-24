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
} from 'react-native';

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
    { title: 'Informar Mal Funcionamento' },
  ];

  const buttonColors = ['#0A0D10', '#0A0D10', '#0A0D10'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      <View style={styles.buttonContainer}>
        {buttons.map((btn, index) => {
          const isActive = selected === index;
          const isShrunk = selected !== null && !isActive;

          return (
            <View
              key={index}
              style={[
                styles.shadowWrapper,
                {
                  flex: isActive ? 2 : isShrunk ? 0.8 : 1,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggle(index)}
                style={[
                  styles.button,
                  {
                    backgroundColor: buttonColors[index],
                  },
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
    paddingTop: 32,
    paddingBottom: 12,
  },
  header: {
    backgroundColor: '#0A0D10',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'System',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  shadowWrapper: {
    borderRadius: 24,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 179, 0, 0.4)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 18,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  button: {
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  buttonText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: 'bold',
    fontFamily: 'System',
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    padding: 8,
    color: '#000',
  },
});
