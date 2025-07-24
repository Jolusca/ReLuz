import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartesianChart, Bar } from 'victory-native';
import { useFont} from "@shopify/react-native-skia";




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



      {/* Gráfico */}
      <View style={styles.chartContainer}>
        <CartesianChart
          data={DATA}
          xKey="x"
          yKeys={['y']}
          domainPadding={{ left: 35, right: 35 }}
          domain={{y: [-5, 105]}}
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {points.y.map((point, index) => (
                <Bar
                  key={index}
                  points={[point]}
                  chartBounds={chartBounds}
                  color={DATA[index].y === maxY ? "#9400D3" : "#FF1493"} // Destaca o maior valor em dourado
                  roundedCorners={{ topLeft: 7, topRight: 7 }}
                  barWidth={30}
                />
              ))}
            </View>
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
    backgroundColor: '#d49f22ff',
    padding: 5,
    justifyContent: 'center',
    gap: 18,
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
    borderRadius: 12,
    padding: 12,
    height: 480,
    color: 'blue',
    marginTop: -70
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    gap: 14,
    marginTop: 20
    
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
