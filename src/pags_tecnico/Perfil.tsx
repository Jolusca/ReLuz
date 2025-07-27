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
    backgroundColor: '#f2eaff', // Fundo claro lilás
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3e246b', // Roxo escuro
    marginBottom: 20,
    textAlign: 'center',
  },
  shadowWrapper: {
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(128, 64, 192, 0.3)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: {
        elevation: 20,
        shadowColor: 'rgba(128, 64, 192, 0.3)',
      },
    }),
  },
  card: {
    backgroundColor: '#a187c9ff', // Roxo claro
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#3e246b', // Roxo escuro
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    color: '#3e246b', // Roxo escuro
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#403953ff', // Roxo médio
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});