import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function GraphScreen() {
  const [tempAtual, setTempAtual] = useState('--');
  const [tempMax, setTempMax] = useState('--');
  const [tempMin, setTempMin] = useState('--');
  const [tempAmanha, setTempAmanha] = useState('--');
  const [chuvaAmanha, setChuvaAmanha] = useState('--');

  const API_KEY = '13ac4b1c5519f53c5a8b9e9d3527ff8c'; // Substitua por sua chave da OpenWeather
  const cidade = 'Fortaleza';


  const boxColors = ['#FFAD00', '#FFC341', '#FFC341', '#FEDE97']; 
  // Ordem: Atual, Máxima, Mínima, Amanhã

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
      <View style={[styles.box, styles.boxLarge, { backgroundColor: boxColors[0] }]}>
        <Text style={styles.text}>Temperatura Atual</Text>
        <Text style={styles.value}>{tempAtual}°C</Text>
      </View>

    <View style={styles.row}>
          <View style={[styles.box, styles.boxMedium, { backgroundColor: boxColors[1] }]}>
            <Text style={styles.text}>Máxima</Text>
            <Text style={styles.value}>{tempMax}°C</Text>
          </View>
          <View style={[styles.box, styles.boxMedium, { backgroundColor: boxColors[2] }]}>
            <Text style={styles.text}>Mínima</Text>
            <Text style={styles.value}>{tempMin}°C</Text>
          </View>
        </View>

      <View style={[styles.box, { marginTop: 16, backgroundColor: boxColors[3] }]}>
        <Text style={styles.text}>Amanhã</Text>
        <Text style={styles.value}>{tempAmanha}°C</Text>
        <Text style={styles.text}>Chuva: {chuvaAmanha}%</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  box: {
    flex: 1,
    borderRadius:30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  boxLarge: {
    height: 140,
  },
  boxMedium: {
    height: 300, // ou o valor que quiser
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
});
