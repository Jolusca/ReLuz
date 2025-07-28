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
import { db } from '../firebase';

export default function Perfil_Cliente() {
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    role?: string;
    created_at?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const userId = "userId_1";

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
        <ActivityIndicator size="large" color="#d4a022" />
        <Text style={{ marginTop: 12, color: '#5D4A20' }}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: '#5D4A20', fontSize: 18 }}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.shadowWrapper}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nome</Text>
            <Text style={styles.cardValue}>{userData.name || '-'}</Text>
            <Text style={styles.cardSubtitle}>Nome completo do cliente</Text>
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
    backgroundColor: '#fffcece1', // off-white amarelado
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
        shadowColor: 'rgba(212, 160, 34, 0.3)', // dourado suave
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
      },
      android: {
        elevation: 20,
        shadowColor: 'rgba(212, 160, 34, 0.3)',
      },
    }),
  },

  card: {
    backgroundColor: '#fae483ff', // amarelo claro dourado
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardTitle: {
    color: '#5D4A20', // marrom escuro / dourado escuro
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },

  cardValue: {
    color: '#5D4A20',
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardSubtitle: {
    color: '#8A7C5A', // marrom claro
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffcece1',
  },
});
