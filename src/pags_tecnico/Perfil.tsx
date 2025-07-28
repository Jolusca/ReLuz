import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import { ref, onValue } from 'firebase/database';
import { db } from '../firebase'; // ajuste o caminho conforme seu projeto

export default function Perfil_Tec() {
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    role?: string;
    created_at?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const userId = "userId_2";

  useEffect(() => {
    const userRef = ref(db, `users/${userId}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar dados do usuário:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const dataFormatada = useMemo(() => {
    if (!userData?.created_at) return "";
    const d = new Date(userData.created_at);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });
  }, [userData?.created_at]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8040c0" />
        <Text style={{ marginTop: 12, color: '#3e246b' }}>Carregando dados do técnico...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#3e246b', fontSize: 18 }}>Técnico não encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome</Text>
            <Text style={styles.cardValue}>{userData.name || '-'}</Text>
            <Text style={styles.cardSubtitle}>Nome completo do técnico</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardValue}>{userData.email || '-'}</Text>
            <Text style={styles.cardSubtitle}>Endereço de e-mail</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Função</Text>
            <Text style={styles.cardValue}>{userData.role || '-'}</Text>
            <Text style={styles.cardSubtitle}>Tipo de usuário no sistema</Text>
          </View>
        </View>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Criado em</Text>
            <Text style={styles.cardValue}>{dataFormatada || '-'}</Text>
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
    backgroundColor: '#f2eaff',
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3e246b',
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
    backgroundColor: '#a187c9ff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#3e246b',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    color: '#3e246b',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#403953ff',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2eaff',
  },
});
