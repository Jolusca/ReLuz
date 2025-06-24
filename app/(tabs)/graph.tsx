import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>


      {/* Título no topo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ACOMPANHAMENTO ENERGÉTICO</Text>
      </View>

      {/* Brilho difuso abaixo do gráfico */}
      <View style={styles.shadowWrapper}>
        <View style={styles.graphContainer}>
          <Text style={styles.graphTitle}> Geração de Energia</Text>
          <View style={styles.graphBox}>
            <Text style={styles.graphPlaceholder}>[ Gráfico Aqui ]</Text>
          </View>
          <Text style={styles.graphSubtitle}>Geração de energia dos últimos 7 dias</Text>
        </View>
      </View>

      {/* Botões inferiores */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('historico' as never)}
        >
          <Text style={styles.buttonText}>HISTÓRICO DE GERAÇÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('saude' as never)}
        >
          <Text style={styles.buttonText}>SAÚDE DO SISTEMA</Text>
        </TouchableOpacity>
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
    paddingBottom: 16,
  },
  /*
  drawerButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#1c1c1c',
    padding: 10,
    borderRadius: 10,
  },
  */
  header: {
    backgroundColor: '#0A0D10',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50, // Deixa espaço para o botão do drawer
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shadowWrapper: {
    marginBottom: 60,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 179, 0, 0.8)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.7,
        shadowRadius: 30,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  graphContainer: {
    backgroundColor: '#0A0D10',
    borderRadius: 20,
    padding: 16,
  },
  graphTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  graphBox: {
    height: 200,
    backgroundColor: '#222',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  graphPlaceholder: {
    color: '#aaa',
  },
  graphSubtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0A0D10',
    borderRadius: 14,
    paddingVertical: 20,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});
