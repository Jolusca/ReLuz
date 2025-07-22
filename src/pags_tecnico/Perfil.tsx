import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function Perfil_Tec() {
  const dataCriacao = '2025-01-06T11:00:00Z';

  const dataFormatada = useMemo(() => {
    return new Date(dataCriacao).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });
  }, [dataCriacao]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Text style={styles.header}>Perfil do Técnico</Text>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome</Text>
            <Text style={styles.cardValue}>Maria Técnica</Text>
            <Text style={styles.cardSubtitle}>Nome completo do técnico</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardValue}>maria@solar.com</Text>
            <Text style={styles.cardSubtitle}>Endereço de e-mail</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Função</Text>
            <Text style={styles.cardValue}>technician</Text>
            <Text style={styles.cardSubtitle}>Tipo de usuário no sistema</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Criado em</Text>
            <Text style={styles.cardValue}>{dataFormatada}</Text>
            <Text style={styles.cardSubtitle}>Data de criação da conta</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7729c5ff', // Roxo complementar
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  shadowWrapper: {
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#4a185f',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
      },
      android: {
        elevation: 20,
        shadowColor: 'rgba(200, 170, 255, 0.4)',
      },
    }),
  },
  card: {
    backgroundColor: '#5a0294ff', // MediumPurple
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#f5eaff',
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
    color: '#dcd0ff',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});
