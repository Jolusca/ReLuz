import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CartesianChart, Line } from "victory-native";
import { ref, get } from "firebase/database";
import { db } from "../firebase"; // ✅ usa o db exportado do firebase.ts
import { useFont } from "@shopify/react-native-skia";
import { RefreshCcw } from "lucide-react-native";

const panelPaths = ["Painel_1", "Painel_2", "Painel_3"];

export default function GraphScreen() {
  const font = useFont(require("../../assets/fonts/Justus-Bold.ttf"), 12);
  const [selectedPoint, setSelectedPoint] = useState<{
    chartIndex: number;
    pointIndex: number;
  } | null>(null);
  const [dataSets, setDataSets] = useState<any[][]>([]);
  const [statuses, setStatuses] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const results: any[][] = [];
    const statusResults: boolean[] = [];

    for (const panel of panelPaths) {
      const statusSnap = await get(ref(db, `panels/${panel}/status`));
      const status = statusSnap.exists() ? !!statusSnap.val() : true;
      statusResults.push(status);

      const snapshot = await get(ref(db, `panels/${panel}/measurements`));
      if (snapshot.exists()) {
        const values = Object.values(snapshot.val()) as any[];
        const sorted = values
          .filter((d) => d.voltage && d.timestamp)
          .map((d) => ({
            x: new Date(d.timestamp).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            y: d.voltage,
          }));
        results.push(sorted);
      } else {
        results.push([]);
      }
    }

    setStatuses(statusResults);
    setDataSets(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const recarregarDados = () => {
    setLoading(true);
    fetchData();
  };

  const renderChart = (
    data: any[],
    title: string,
    chartIndex: number,
    active: boolean
  ) => (
    <View
      style={[
        styles.chartContainer,
        { height: 450 },
        !active && { backgroundColor: "#c0c0c0" }, // fundo cinza se inativo
      ]}
      key={chartIndex}
    >
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>
          {active ? title : `${title} - em manutenção`}
        </Text>
      </View>
      <CartesianChart
        data={data}
        xKey="x"
        yKeys={["y"]}
        domainPadding={{ left: 20, right: 20 }}
        xAxis={{
          font,
          labelColor: active ? "#5D4A20" : "#666666",
        }}
        yAxis={[
          {
            yKeys: ["y"],
            font,
            labelColor: active ? "#8A7C5A" : "#999999",
          },
        ]}
      >
        {({ points }) => (
          <>
            <Line
              points={points.y}
              curveType="natural"
              color={active ? "#d4a022" : "#777777"} // linha cinza se inativo
              strokeWidth={3}
              strokeJoin="round"
              strokeCap="round"
            />
            {points.y.map((point, index) => (
              <TouchableOpacity
                key={`${chartIndex}-pt-${index}`}
                activeOpacity={0.8}
                onPress={() =>
                  setSelectedPoint((prev) =>
                    prev?.chartIndex === chartIndex && prev?.pointIndex === index
                      ? null
                      : { chartIndex, pointIndex: index }
                  )
                }
                style={{
                  position: "absolute",
                  left: (point.x ?? 0) - 10,
                  top: (point.y ?? 0) - 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: active ? "#d4a022" : "#777777",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {selectedPoint?.chartIndex === chartIndex &&
                  selectedPoint?.pointIndex === index && (
                    <View
                      style={[
                        styles.tooltip,
                        !active && { backgroundColor: "#666666" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tooltipText,
                          !active && { color: "#cccccc" },
                        ]}
                      >
                        {data[index].y}
                      </Text>
                    </View>
                  )}
              </TouchableOpacity>
            ))}
          </>
        )}
      </CartesianChart>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d4a022" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, gap: 24 }}>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={recarregarDados}
        accessibilityLabel="Atualizar dados dos painéis"
      >
        <RefreshCcw color="#5D4A20" size={24} />
      </TouchableOpacity>

      {dataSets.map((data, index) =>
        renderChart(data, `Placa ${index + 1}`, index, statuses[index])
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffcece1",
  },
  refreshButton: {
    alignSelf: "flex-end",
    marginBottom: 12,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(212, 160, 34, 0.2)",
  },
  chartContainer: {
    backgroundColor: "#fae483ff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "rgba(212, 160, 34, 0.3)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 20,
    color: "#5D4A20",
    marginBottom: 12,
    fontWeight: "bold",
  },
  tooltip: {
    backgroundColor: "#5D4A20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    position: "absolute",
    top: -30,
  },
  tooltipText: {
    color: "#fffcece1",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#5D4A20",
    marginTop: 10,
  },
});
