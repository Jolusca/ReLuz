import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartesianChart, Line, useLinePath } from 'victory-native';
import { Path } from "@shopify/react-native-skia";
import { useFont } from "@shopify/react-native-skia";

const DATA = [
  { x: 'Seg', y: 60 },
  { x: 'Ter', y: 60 },
  { x: 'Qua', y: 100 },
  { x: 'Qui', y: 30 },
  { x: 'Sex', y: 70 },
  { x: 'Sab', y: 45 },
  { x: 'Dom', y: 50 }
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
          domainPadding={{ left: 5, right: 13 }}
          domain={{ y: [-5, 105] }}
          xAxis={{
            font,
            tickCount: 8,
            labelColor: "#fff",
          }}
          yAxis={[{
            yKeys: ["y"],
            font,
            labelColor: "#ccc",
          }]}
        >
          {({ points }) => {
            return (
              <Line
                points={points.y}
                curveType="natural"
                color="#eeff00ff"
                strokeWidth={7}
                strokeJoin="round"
                strokeCap="butt"
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

//  Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    padding: 5,
    justifyContent: 'center',
    gap: 18,
  },
  chartContainer: {
    backgroundColor: '#a07208ff',
    borderRadius: 12,
    padding: 4,
    height: 460,
    color: 'blue',
    marginTop: -50
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    gap: 14,
    marginTop: 10
  },
  button: {
    flex: 1,
    backgroundColor: '#a07208ff',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
