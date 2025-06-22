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
        <Text style={styles.headerText}>MENU</Text>
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
                  flex: isActive ? 3 : isShrunk ? 1 : 1,
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#0A0D10',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    color: '#ccc',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'System', // Altere aqui o nome da fonte se desejar
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  shadowWrapper: {
    borderRadius: 30,
    marginBottom: 16,
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
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: 'bold',
    fontFamily: 'System', // Altere aqui também se quiser usar outra fonte
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
