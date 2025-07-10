import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';
import { useFont } from "@shopify/react-native-skia";



// Dados do gráfico
const DATA = [
  { x: 'Ter', y: 60, color: '#FF2DCB' },
  { x: 'Qua', y: 100, color: '#6900FF' },
  { x: 'Qui', y: 30, color: '#FF2DCB' },
  { x: 'Sex', y: 70, color: '#FF2DCB' },
  { x: 'Dom', y: 50, color: '#FF2DCB' },
];

export default function Historico() {
  const font = useFont(require("../../assets/fonts/Justus-Bold.ttf"), 12);
  const maxY = Math.max(...DATA.map(d => d.y))
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>HISTÓRICO DE GERAÇÃO</Text>
      </View>

      {/* Gráfico */}
      <View style={styles.chartContainer}>
        <CartesianChart
          data={DATA}
          xKey="x"
          yKeys={['y']}
          domainPadding={{ left: 18, right: 18 }}
          domain={{y: [-10, 105]}}
          xAxis={{
            font, 
            tickCount: 5,
            labelColor: "#fff",
          }}
          yAxis={[{
            yKeys: ["y"],
            font,
            labelColor: "#ccc",
          }]}
          >
                
          {({ points, chartBounds }) => (
            <>
              {points.y.map((point, index) => (
                <Bar
                  key={index}
                  points={[point]}
                  chartBounds={chartBounds}
                  color={DATA[index].y === maxY ? "#9400D3" : "#FF1493"} // Destaca o maior valor em dourado
                  roundedCorners={{ topLeft: 7, topRight: 7 }}
                  barWidth={35}
                />
              ))}
            </>
          )}
        </CartesianChart>
      </View>

      {/* Botões inferiores */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SAÚDE DO SISTEMA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ACOMPANHAMENTO ENERGÉTICO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
    justifyContent: 'center',
    gap: 12,
  },
  header: {
    backgroundColor: '#005',
    padding: 2,
    borderRadius: 10,
    alignItems: 'center',
    height: 90,
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#013',
    borderRadius: 20,
    padding: 6,
    height: 430,
    color: 'blue'
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    gap: 8,
    
  },
  button: {
    flex: 1,
    backgroundColor: '#002',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    
  },
});
