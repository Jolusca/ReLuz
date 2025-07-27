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

export default function Perfil_Cliente() {
  const dataCriacao = '2025-01-05T10:30:00Z';

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome</Text>
            <Text style={styles.cardValue}>João Cliente</Text>
            <Text style={styles.cardSubtitle}>Nome completo do cliente</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardValue}>joao.cliente@email.com</Text>
            <Text style={styles.cardSubtitle}>Endereço de e-mail</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Função</Text>
            <Text style={styles.cardValue}>cliente</Text>
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
    backgroundColor: '#f2eaff', // fundo off-white puxado para lilás claro
    paddingTop: 36,
    padding: 16,
  },

  scrollContent: {
    paddingTop: 24,
    paddingBottom: 32,
  },

  shadowWrapper: {
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(128, 64, 192, 0.3)', // sombra roxa suave
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
    backgroundColor: '#a187c9ff', // fundo roxo claro
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardTitle: {
    color: '#3e246b', // roxo escuro
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },

  cardValue: {
    color: '#3e246b', // roxo escuro
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardSubtitle: {
    color: '#7c6fa3', // roxo médio
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});
