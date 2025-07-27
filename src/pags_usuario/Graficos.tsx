import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { CartesianChart, Line } from 'victory-native';
import { useFont } from "@shopify/react-native-skia";

const DATA1 = [
  { x: 'Seg', y: 60 },
  { x: 'Ter', y: 60 },
  { x: 'Qua', y: 100 },
  { x: 'Qui', y: 30 },
  { x: 'Sex', y: 70 },
  { x: 'Sab', y: 45 },
  { x: 'Dom', y: 50 }
];

const DATA2 = [
  { x: 'Seg', y: 40 },
  { x: 'Ter', y: 70 },
  { x: 'Qua', y: 80 },
  { x: 'Qui', y: 55 },
  { x: 'Sex', y: 60 },
  { x: 'Sab', y: 50 },
  { x: 'Dom', y: 65 }
];

const DATA3 = [
  { x: 'Seg', y: 75 },
  { x: 'Ter', y: 80 },
  { x: 'Qua', y: 70 },
  { x: 'Qui', y: 90 },
  { x: 'Sex', y: 85 },
  { x: 'Sab', y: 60 },
  { x: 'Dom', y: 80 }
];

export default function GraphScreen() {
  const font = useFont(require("../../assets/fonts/Justus-Bold.ttf"), 12);
  const [selectedPoint, setSelectedPoint] = useState<{ chartIndex: number; pointIndex: number } | null>(null);

  const renderChart = (data: typeof DATA1, title: string, chartIndex: number) => (
    <View style={[styles.chartContainer, { height: 450 }]} key={chartIndex}>
      <Text style={styles.chartTitle}>{title}</Text>
      <CartesianChart
        data={data}
        xKey="x"
        yKeys={['y']}
        domainPadding={{ left: 5, right: 13 }}
        domain={{ y: [0, 110] }}
        xAxis={{
          font,
          tickCount: 8,
          labelColor: "#5D4A20",
        }}
        yAxis={[{
          yKeys: ["y"],
          font,
          labelColor: "#8A7C5A",
        }]}
      >
        {({ points }) => (
          <>
            <Line
              points={points.y}
              curveType="natural"
              color="#d4a022"
              strokeWidth={5}
              strokeJoin="round"
              strokeCap="round"
            />
            {points.y
              .filter(point => point.y !== null && point.y !== undefined)
              .map((point, index) => (
                <TouchableOpacity
                  key={`${chartIndex}-pt-${index}`}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (selectedPoint?.chartIndex === chartIndex && selectedPoint?.pointIndex === index) {
                      setSelectedPoint(null);
                    } else {
                      setSelectedPoint({ chartIndex, pointIndex: index });
                    }
                  }}
                  style={{
                    position: 'absolute',
                    left: (point.x ?? 0) - 12,
                    top: (point.y ?? 0) - 12,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#d4a022',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {selectedPoint?.chartIndex === chartIndex && selectedPoint?.pointIndex === index && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>{data[index].y}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </>
        )}
      </CartesianChart>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, gap: 24 }}>
      {renderChart(DATA1, 'Placa 1', 0)}
      {renderChart(DATA2, 'Placa 2', 1)}
      {renderChart(DATA3, 'Placa 3', 2)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcece1',
  },
  chartContainer: {
    backgroundColor: '#fae483ff',
    borderRadius: 16,
    padding: 10,
    shadowColor: 'rgba(212, 160, 34, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  chartTitle: {
    color: '#5D4A20',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: 36,
    backgroundColor: '#5D4A20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tooltipText: {
    color: '#fae483ff',
    fontWeight: '700',
  },
});
