import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [
    {
      data: [20, 35, 50, 60, 57, 45, 40],
      color: () => '#FFCC00',
      strokeWidth: 3,
    },
  ],
};

export default function GraphScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ACOMPANHAMENTO ENERGÉTICO</Text>

      {/* Glow Background */}
      <View style={styles.glowBackground} />

      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Ionicons name="bar-chart" size={20} color="#FFCC00" />
          <Text style={styles.title}>Geração de Energia</Text>
        </View>

        <LineChart
          data={chartData}
          width={screenWidth * 0.85}
          height={200}
          chartConfig={{
            backgroundColor: '#0E0E0E',
            backgroundGradientFrom: '#0E0E0E',
            backgroundGradientTo: '#0E0E0E',
            decimalPlaces: 0,
            color: () => '#FFCC00',
            labelColor: () => '#AAAAAA',
            propsForDots: {
              r: '5',
              fill: '#FFCC00',
              stroke: '#0E0E0E',
              strokeWidth: 2,
            },
          }}
          bezier
          style={styles.chart}
        />

        <Text style={styles.subtext}>Geração de energia dos últimos 7 dias</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.glowButton}>
          <Text style={styles.buttonText}>HISTÓRICO DE GERAÇÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.glowButton}>
          <Text style={styles.buttonText}>SAÚDE DO SISTEMA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 50,
    gap: 20,
  },
  header: {
    backgroundColor: '#0E0E0E',
    color: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    shadowColor: '#FFCC00',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 20,
  },
  glowBackground: {
    position: 'absolute',
    top: 120,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFCC00',
    opacity: 0.05,
    zIndex: -1,
    shadowColor: '#FFCC00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 80,
  },
  card: {
    backgroundColor: '#0E0E0E',
    borderRadius: 20,
    padding: 16,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#FFCC00',
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 15,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
  subtext: {
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  glowButton: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FFCC00',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
