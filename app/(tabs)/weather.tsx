import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, Dimensions, ScrollView } from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

// Alturas ajustadas
const CARD_LARGE_HEIGHT = screenHeight * 0.2;
const CARD_SMALL_HEIGHT = screenHeight * 0.12;

export default function WeatherScreen() {
  const [tempAtual, setTempAtual] = useState('--');
  const [tempMax, setTempMax] = useState('--');
  const [tempMin, setTempMin] = useState('--');
  const [tempAmanha, setTempAmanha] = useState('--');
  const [chuvaAmanha, setChuvaAmanha] = useState('--');

  const API_KEY = '13ac4b1c5519f53c5a8b9e9d3527ff8c';
  const cidade = 'Fortaleza';

  useEffect(() => {
    async function fetchTemperaturas() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&units=metric&appid=${API_KEY}`
        );
        const dados = await res.json();

        setTempAtual(dados.main.temp.toFixed(1));
        setTempMax(dados.main.temp_max.toFixed(1));
        setTempMin(dados.main.temp_min.toFixed(1));

        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        const diaAmanha = amanha.getDate();

        const resForecast = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},BR&units=metric&appid=${API_KEY}`
        );
        const dadosForecast = await resForecast.json();

        const previsaoAmanha = dadosForecast.list.find((item: any) => {
          const data = new Date(item.dt * 1000);
          return data.getDate() === diaAmanha && data.getHours() === 12;
        });

        if (previsaoAmanha) {
          const temp = previsaoAmanha.main.temp.toFixed(1);
          const chuva = (previsaoAmanha.pop * 100).toFixed(0);
          setTempAmanha(temp);
          setChuvaAmanha(chuva);
        }
      } catch (err) {
        console.error('Erro ao buscar dados do clima:', err);
      }
    }

    fetchTemperaturas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CLIMA ATUAL</Text>
        </View>

        {/* Temperatura Atual */}
        <View style={styles.shadowWrapper}>
          <View style={[styles.card, { minHeight: CARD_LARGE_HEIGHT }]}>
            <Text style={styles.cardTitle}>Temperatura Atual</Text>
            <Text style={styles.cardValue}>{tempAtual}°C</Text>
          </View>
        </View>

        {/* Máxima e Mínima */}
        <View style={styles.row}>
          <View style={styles.shadowWrapper}>
            <View style={[styles.cardSmall, { minHeight: CARD_SMALL_HEIGHT }]}>
              <Text style={styles.cardTitle}>Máxima</Text>
              <Text style={styles.cardValue}>{tempMax}°C</Text>
            </View>
          </View>
          <View style={styles.shadowWrapper}>
            <View style={[styles.cardSmall, { minHeight: CARD_SMALL_HEIGHT }]}>
              <Text style={styles.cardTitle}>Mínima</Text>
              <Text style={styles.cardValue}>{tempMin}°C</Text>
            </View>
          </View>
        </View>

        {/* Amanhã */}
        <View style={styles.shadowWrapper}>
          <View style={[styles.card, { minHeight: CARD_LARGE_HEIGHT }]}>
            <Text style={styles.cardTitle}>Amanhã</Text>
            <Text style={styles.cardValue}>{tempAmanha}°C</Text>
            <Text style={styles.cardSubtitle}>Chuva: {chuvaAmanha}%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  header: {
    backgroundColor: '#0A0D10',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  shadowWrapper: {
    borderRadius: 20,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 179, 0, 0.6)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  card: {
    backgroundColor: '#0A0D10',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSmall: {
    backgroundColor: '#0A0D10',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    width: screenWidth / 2 - 28,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 6,
  },
});
