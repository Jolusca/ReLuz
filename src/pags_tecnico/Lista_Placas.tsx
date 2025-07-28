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
} from 'react-native';
import { Wrench, Check, X, RefreshCcw } from 'lucide-react-native';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';

type Status = 'Ativa' | 'Manutenção';

interface Placa {
  id: string;
  nome: string;
  local: string;
  status: Status;
}

const corStatus: Record<Status, string> = {
  Ativa: '#4CAF50',         // Verde pode ficar para status ativo
  Manutenção: '#F44336',    // Vermelho para manutenção
};

const painelIds = ['Painel_1', 'Painel_2', 'Painel_3'];

function mapStatus(statusBool: boolean | null | undefined): Status {
  return statusBool === true ? 'Ativa' : 'Manutenção';
}

export default function TelaResumoPlacas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [placaSelecionada, setPlacaSelecionada] = useState<Placa | null>(null);

  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [feedbackMensagem, setFeedbackMensagem] = useState('');

  const [placas, setPlacas] = useState<Placa[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlacas = async () => {
    setLoading(true);
    try {
      const placasFetched: Placa[] = [];

      for (const id of painelIds) {
        const snapshot = await get(ref(db, `panels/${id}`));
        const locationSnap = await get(ref(db, `panels/${id}/location`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const location = locationSnap.exists() ? locationSnap.val() : 'Local desconhecido';

          placasFetched.push({
            id: id.replace('Painel_', ''), // só número no id
            nome: data.nome ?? id,
            local: location,
            status: mapStatus(data.status),
          });
        } else {
          placasFetched.push({
            id: id.replace('Painel_', ''),
            nome: id,
            local: 'Local desconhecido',
            status: 'Manutenção',
          });
        }
      }
      setPlacas(placasFetched);
    } catch (error) {
      console.error('Erro ao buscar dados dos painéis:', error);
      setPlacas(
        painelIds.map((id) => ({
          id: id.replace('Painel_', ''),
          nome: id,
          local: 'Local desconhecido',
          status: 'Manutenção',
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlacas();
  }, []);

  const abrirModal = (placa: Placa) => {
    setPlacaSelecionada(placa);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setPlacaSelecionada(null);
  };

  const mostrarFeedback = (mensagem: string) => {
    setFeedbackMensagem(mensagem);
    setModalFeedbackVisible(true);
  };

  const cancelarProblema = () => {
    mostrarFeedback('Operação cancelada');
    fecharModal();
  };

  const confirmarProblema = async () => {
    if (!placaSelecionada) return;

    try {
      const painelPath = `panels/Painel_${placaSelecionada.id}`;

      const statusSnap = await get(ref(db, `${painelPath}/status`));
      const statusAtual = statusSnap.exists() ? statusSnap.val() : false;

      const novoStatus = !statusAtual;

      await update(ref(db, painelPath), { status: novoStatus });

      mostrarFeedback(`Status da placa "${placaSelecionada.nome}" atualizado para ${novoStatus ? 'Ativa' : 'Manutenção'}`);

      fetchPlacas();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      mostrarFeedback('Erro ao atualizar status. Tente novamente.');
    }

    fecharModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra topo */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Atualizar Dados</Text>
        <TouchableOpacity
          onPress={fetchPlacas}
          style={styles.refreshButton}
          accessibilityLabel="Atualizar dados dos painéis"
        >
          <RefreshCcw color="#3e246b" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={placas}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchPlacas}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => abrirModal(item)}
                accessibilityLabel={`Informar problema na ${item.nome}`}
              >
                <Wrench color="#3e246b" size={18} />
              </TouchableOpacity>
            </View>

            <Text style={styles.cardSubtitle}>Local: {item.local}</Text>
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

      {/* Modal confirmação */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {placaSelecionada?.status === 'Ativa'
                ? `Deseja informar manutenção preventiva na placa solar `
                : `Deseja concluir o pedido de manutenção na placa solar `}
              <Text style={{ fontWeight: 'bold' }}>
                "{placaSelecionada?.nome}"
              </Text>
              ?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.buttonSim]}
                onPress={confirmarProblema}
              >
                <Check color="#fff" size={20} />
                <Text style={styles.buttonText}>Sim</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.buttonNao]}
                onPress={cancelarProblema}
              >
                <X color="#fff" size={20} />
                <Text style={styles.buttonText}>Não</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal feedback */}
      <Modal
        transparent
        animationType="fade"
        visible={modalFeedbackVisible}
        onRequestClose={() => setModalFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{feedbackMensagem}</Text>
            <Pressable
              style={[styles.modalButton, styles.buttonOk]}
              onPress={() => setModalFeedbackVisible(false)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
