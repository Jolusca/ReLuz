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
  // Exemplo fixo para demo, substitua pelo dado real da API/Firebase
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
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>


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
    backgroundColor: '#c79e46da',
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
      shadowColor: 'rgba(248, 236, 193, 0.5)', // dourado claro suave
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 30, // mais difuso
    },
    android: {
      elevation: 20,
      shadowColor: 'rgba(248, 236, 193, 0.5)', // necessário com novo RN
    },
  }),
},
  card: {
    backgroundColor: '#d49f22ff', // MediumPurple
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#212832',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    color: '#0',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#212832',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
});
