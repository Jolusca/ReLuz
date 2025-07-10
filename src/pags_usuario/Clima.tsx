import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const CARD_LARGE_HEIGHT = screenHeight * 0.24;
const CARD_SMALL_HEIGHT = screenHeight * 0.14;

export default function WeatherScreen() {
  const [tempAmanha, setTempAmanha] = useState('--');
  const [chuvaAmanha, setChuvaAmanha] = useState('--');
  const [nuvens, setNuvens] = useState('--');
  const [indiceUV, setIndiceUV] = useState('--');

  const API_KEY = '13ac4b1c5519f53c5a8b9e9d3527ff8c';
  const cidade = 'Fortaleza';

  useEffect(() => {
    async function fetchClimaSolar() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&units=metric&appid=${API_KEY}`
        );
        const dados = await res.json();

        setNuvens(dados.clouds.all.toFixed(0));

        const { lat, lon } = dados.coord;
        const resUV = await fetch(
          `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const dadosUV = await resUV.json();
        setIndiceUV(dadosUV.value.toFixed(1));

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

    fetchClimaSolar();
  }, []);

  // Pega hora local
  const agora = new Date();
  const hora = agora.getHours();

  // Se estiver entre 7 e 18h mostra índice UV, senão mostra 0 e texto "Sem radiação solar"
  const uvValue = (hora >= 7 && hora <= 18) ? parseFloat(indiceUV) : 0;
  const uvDisplayText = (hora >= 7 && hora <= 18) ? indiceUV : '0';

  const uvBarWidth = Math.min(uvValue / 11, 1) * (screenWidth - 100);

  const getUVColor = (uv: number) => {
    if (uv <= 2) return '#2ECC71'; // verde
    if (uv <= 5) return '#F1C40F'; // amarelo
    if (uv <= 7) return '#E67E22'; // laranja
    return '#E74C3C'; // vermelho
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CLIMA ATUAL</Text>
        </View>

        {/* Nível de Geração Solar */}
        <View style={styles.shadowWrapper}>
          <View style={[styles.card, { minHeight: CARD_LARGE_HEIGHT }]}>
            <Text style={styles.cardTitle}>Nível de Geração Solar (UV)</Text>
            <Text style={[styles.cardValue, { color: getUVColor(uvValue) }]}>
              {uvDisplayText}
            </Text>
            <View style={styles.uvBarBackground}>
              <View
                style={[
                  styles.uvBar,
                  {
                    width: uvBarWidth,
                    backgroundColor: getUVColor(uvValue),
                  },
                ]}
              />
            </View>
            <Text style={styles.cardSubtitle}>
              {uvValue === 0
                ? 'Descanso noturno — sem UV 😴'
                : `Nível: ${
                    uvValue <= 2
                      ? 'Mínimo ☁️'
                      : uvValue <= 5
                      ? 'Médio 🌤️'
                      : uvValue <= 8
                      ? 'Alto ☀️'
                      : 'Máximo 🔆'
                  }`}
            </Text>
          </View>
        </View>

        {/* Nuvens e Chuva */}
        <View style={styles.row}>
          <View style={styles.shadowWrapper}>
            <View style={[styles.cardSmall, { minHeight: CARD_SMALL_HEIGHT }]}>
              <Text style={styles.cardTitle}>Nuvens</Text>
              <Text style={styles.cardValue}>{nuvens}%</Text>
              <Text style={styles.cardSubtitle}>
                {parseInt(nuvens) <= 20
                  ? 'Céu limpo ☀️'
                  : parseInt(nuvens) <= 60
                  ? 'Parcial 🌤️'
                  : 'Nublado ☁️'}
              </Text>
            </View>
          </View>

          <View style={styles.shadowWrapper}>
            <View style={[styles.cardSmall, { minHeight: CARD_SMALL_HEIGHT }]}>
              <Text style={styles.cardTitle}>Chuva Amanhã</Text>
              <Text style={styles.cardValue}>{chuvaAmanha}%</Text>
              <Text style={styles.cardSubtitle}>
                {parseInt(chuvaAmanha) > 50 ? 'Alta chance 🌧️' : 'Baixa chance 🌥️'}
              </Text>
            </View>
          </View>
        </View>

        {/* Temperatura de Amanhã */}
        <View style={styles.shadowWrapper}>
          <View style={[styles.card, { minHeight: CARD_LARGE_HEIGHT }]}>
            <Text style={styles.cardTitle}>Temperatura Amanhã</Text>
            <Text style={styles.cardValue}>{tempAmanha}°C</Text>
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
    marginBottom: 30,
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
    marginTop: 10,
    marginBottom: 10,
  },
  shadowWrapper: {
    borderRadius: 20,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(255, 179, 0, 0.6)',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 25,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  card: {
    backgroundColor: '#003',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSmall: {
    backgroundColor: '#002',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: screenWidth / 2 - 28,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  uvBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 12,
  },
  uvBar: {
    height: 8,
    borderRadius: 10,
  },
});
