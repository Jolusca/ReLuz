import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { RefreshCcw } from 'lucide-react-native';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';

interface Usuario {
  id: string;
  name: string;
  role: string;
}

export default function TelaResumoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const snapshot = await get(ref(db, 'users'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        // data é um objeto com keys como userId e valores com user info
        const usuariosArray: Usuario[] = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            id: key,
            name: value.name ?? 'Nome não informado',
            role: value.role ?? 'Função não informada',
          })
        );
        setUsuarios(usuariosArray);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsuarios([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Usuários Cadastrados</Text>
        <TouchableOpacity
          onPress={fetchUsuarios}
          style={styles.refreshButton}
          accessibilityLabel="Atualizar lista de usuários"
        >
          <RefreshCcw color="#3e246b" size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3e246b" />
          <Text style={styles.loadingText}>Carregando usuários...</Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>Função: {item.role}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2eaff',
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3e246b',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 64, 192, 0.2)',
  },
  card: {
    backgroundColor: '#a187c9ff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: 'rgba(128, 64, 192, 0.3)',
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    color: '#3e246b',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4e4568ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#3e246b',
    marginTop: 10,
  },
});
