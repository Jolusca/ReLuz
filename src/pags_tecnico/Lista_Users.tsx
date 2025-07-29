import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshCcw } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Usuario {
  id: string;
  name: string;
  role: string;
}

const API_KEY = 'AIzaSyCiNGx69_qP-hHXYKJ15irve8HtbE5hpxI';
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const USERS_URL = 'http://localhost:3000/api/users/';

export default function TelaResumoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');

  const loginAdmin = async () => {
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'testuser3@example.com',
          password: 'securePassword123',
          returnSecureToken: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Erro na autenticação');
      }

      await AsyncStorage.setItem('auth_token', data.idToken);
    } catch (error: any) {
      console.error('Erro ao logar Admin:', error.message);
      Alert.alert('Erro ao logar Admin', error.message);
    }
  };

  const buscarUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const response = await fetch(USERS_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      const usuariosArray: Usuario[] = data.map((user: any) => ({
        id: user.id,
        name: user.name ?? 'Nome não informado',
        role: user.role ?? 'Função não informada',
      }));

      setUsuarios(usuariosArray);
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error.message);
      Alert.alert('Erro ao buscar usuários', error.message);
      setUsuarios([]);
    }
  };

  const fetchUsuarios = async () => {
    setLoading(true);
    setUsuarios([]);
    await loginAdmin();
    await buscarUsuarios();
    setLoading(false);
  };

  const abrirModalEdicao = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setNomeEditado(usuario.name);
    setModalVisible(true);
  };

  const salvarNomeEditado = async () => {
    if (!usuarioSelecionado) return;
    const token = await AsyncStorage.getItem('auth_token');

    try {
      const response = await fetch(`${USERS_URL}/${usuarioSelecionado.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nomeEditado,
          role: usuarioSelecionado.role, // Mantém a role atual
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar usuário: ${response.status}`);
      }

      Alert.alert('Sucesso', 'Nome atualizado com sucesso.');
      setModalVisible(false);
      fetchUsuarios();
    } catch (error: any) {
      console.error(error.message);
      Alert.alert('Erro ao salvar nome', error.message);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
              <TouchableOpacity
                onPress={() => abrirModalEdicao(item)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Editar Nome</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Nome</Text>
            <TextInput
              style={styles.input}
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Novo nome"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Salvar" onPress={salvarNomeEditado} />
              <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 28,
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
  editButton: {
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#4e4568ff',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#3e246b',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 4,
  },
});
