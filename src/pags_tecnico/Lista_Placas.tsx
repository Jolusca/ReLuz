import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, ActivityIndicator } from 'react-native';

type Panel = {
  id: string;
  name: string;
  location: string;
  installation_date: string;
};

export default function Lista_Placa() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as placas no backend
  const fetchPanels = async () => {
    setLoading(true);
    setError(null);

    try {
      // Troque o IP abaixo se necessário (ex: 10.0.2.2 para emulador Android)
      const response = await fetch('http://10.0.2.2:3000/panels', {
        headers: {
          // Se precisar de autenticação, coloque o token aqui:
          // Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar placas');
      }

      const data = await response.json();
      setPanels(data);
    } catch (e: any) {
      setError(e.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPanels();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#001E1E" />

      <Text style={styles.title}>Lista de Placas Solares</Text>
      <Text style={styles.subtitle}>Escolha uma opção abaixo para continuar:</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Em Funcionamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
        <Text style={styles.buttonText}>Em Manuntenção</Text>
      </TouchableOpacity>

      {/* Mostrar loading, erro ou lista de placas */}
      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}
      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}

      {!loading && !error && panels.length > 0 && (
        <FlatList
          data={panels}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20, width: '100%' }}
          renderItem={({ item }) => (
            <View style={styles.panelCard}>
              <Text style={styles.panelName}>{item.name}</Text>
              <Text style={styles.panelLocation}>{item.location}</Text>
              <Text style={styles.panelDate}>{item.installation_date}</Text>
            </View>
          )}
        />
      )}

      {!loading && !error && panels.length === 0 && (
        <Text style={{ color: '#ccc', marginTop: 20 }}>Nenhuma placa encontrada.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7729c5ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5F5F5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCC',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  panelCard: {
    backgroundColor: '#4a185f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  panelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  panelLocation: {
    fontSize: 14,
    color: '#ddd',
  },
  panelDate: {
    fontSize: 12,
    color: '#bbb',
  },
});
