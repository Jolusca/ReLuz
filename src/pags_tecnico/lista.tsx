import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wrench } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type Status = 'Ativa' | 'Manutenção';

interface Placa {
  id: string;
  name: string;
  location: string;
  status: Status;
}

const corStatus: Record<Status, string> = {
  Ativa: '#4CAF50',
  Manutenção: '#F44336',
};

const API_URL = 'http://localhost:3000/api/panels/'; // atualize com sua URL real

function mapStatus(status: boolean): Status {
  return status ? 'Ativa' : 'Manutenção';
}

export default function TelaResumoPlacas() {
  const [placas, setPlacas] = useState<Placa[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [placaSelecionada, setPlacaSelecionada] = useState<Placa | null>(null);

  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [feedbackMensagem, setFeedbackMensagem] = useState('');

  const API_URL = 'http://<SEU_BACKEND>/api/painel'; // ajuste para sua URL real

  // Busca placas do backend, com token e tratamento de erro
  const fetchPlacas = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) throw new Error('Usuário não autenticado');

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar placas: ${response.status}`);
      }

      const data = await response.json();

      const placasFormatadas: Placa[] = data.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        location: p.location ?? 'Local desconhecido',
        status: mapStatus(p.status),
      }));

      setPlacas(placasFormatadas);
    } catch (error: any) {
      console.error('Erro ao buscar placas:', error);
      Alert.alert('Erro', error.message || 'Não foi possível carregar os dados das placas.');
      setPlacas([]); // limpa lista em erro
    } finally {
      setLoading(false);
    }
  };

  // Abre modal para o painel selecionado
  const abrirModal = (placa: Placa) => {
    setPlacaSelecionada(placa);
    setModalVisible(true);
  };

  // Fecha modal e limpa seleção
  const fecharModal = () => {
    setModalVisible(false);
    setPlacaSelecionada(null);
  };

  // Mostra modal feedback com mensagem
  const mostrarFeedback = (mensagem: string) => {
    setFeedbackMensagem(mensagem);
    setModalFeedbackVisible(true);
  };

  // Atualiza status da placa via PUT, com token e tratamento
  const confirmarProblema = async () => {
    if (!placaSelecionada) return;

    setLoading(true); // bloqueia interface se necessário

    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) throw new Error('Usuário não autenticado');

      const novoStatusBool = placaSelecionada.status === 'Ativa' ? false : true;

      const response = await fetch(`${API_URL}/${placaSelecionada.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: novoStatusBool,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }

      mostrarFeedback(
        `Status da placa "${placaSelecionada.name}" atualizado para ${novoStatusBool ? 'Ativa' : 'Manutenção'}`
      );

      await fetchPlacas(); // atualiza lista após sucesso
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error);
      mostrarFeedback(error.message || 'Erro ao atualizar status. Tente novamente.');
    } finally {
      setLoading(false);
      fecharModal();
    }
  };

  useEffect(() => {
    fetchPlacas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={placas}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPlacas}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.id}</Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => abrirModal(item)}
                accessibilityLabel={`Informar problema na ${item.id}`}
              >
                <Wrench color="#3e246b" size={18} />
              </TouchableOpacity>
            </View>

            <Text style={styles.cardSubtitle}>Local: {item.location}</Text>
            <View style={styles.statusWrapper}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: corStatus[item.status] },
                ]}
              />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2eaff', // off-white lilás claro
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
    color: '#3e246b', // roxo escuro
  },
  refreshButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 64, 192, 0.2)', // roxo claro translúcido
  },
  card: {
    backgroundColor: '#a187c9ff', // roxo claro
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: 'rgba(128, 64, 192, 0.3)',
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#3e246b', // roxo escuro
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#4e4568ff', // roxo médio
    marginTop: 4,
  },
  iconButton: {
    backgroundColor: 'rgba(128, 64, 192, 0.2)', // roxo claro translúcido
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3e246b', // roxo escuro
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: '#a187c9ff', // roxo claro
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#3e246b', // roxo escuro
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonSim: {
    backgroundColor: '#4CAF50', // mantive verde para "Sim"
  },
  buttonNao: {
    backgroundColor: '#F44336', // vermelho para "Não"
  },
  buttonOk: {
    backgroundColor: '#3e246b', // roxo escuro
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
