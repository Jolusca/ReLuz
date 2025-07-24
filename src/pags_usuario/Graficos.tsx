import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartesianChart, useLinePath } from 'victory-native';
import { Path } from "@shopify/react-native-skia";
import { useFont } from "@shopify/react-native-skia";

const DATA = [
  { x: 'Ter', y: 60, color: '#FF2DCB' },
  { x: 'Qua', y: 100, color: '#6900FF' },
  { x: 'Qui', y: 30, color: '#FF2DCB' },
  { x: 'Sex', y: 70, color: '#FF2DCB' },
  { x: 'Dom', y: 50, color: '#FF2DCB' },
];

export default function GraphScreen() {
  const font = useFont(require("../../assets/fonts/Justus-Bold.ttf"), 12);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <CartesianChart
          data={DATA}
          xKey="x"
          yKeys={['y']}
          domainPadding={{ left: 35, right: 35 }}
          domain={{ y: [-5, 105] }}
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
          {({ points }) => {
            const { path } = useLinePath(points.y); // ← usa os pontos do gráfico
            return (
              <Path
                path={path}
                color="blue"
                strokeWidth={7}
                style="stroke"
                strokeJoin="round"
                strokeCap="round"
              />
            );
          }}
        </CartesianChart>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>HISTÓRICO DE GERAÇÃO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SAÚDE DO SISTEMA</Text>
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
