import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Wrench, Check, X } from 'lucide-react-native';

type Status = 'Ativa' | 'Manutenção' | 'Inativa';

interface Placa {
  id: string;
  nome: string;
  local: string;
  status: Status;
}

const dadosPlacas: Placa[] = [
  { id: '1', nome: 'Placa Solar A', local: 'Telhado Norte', status: 'Ativa' },
  { id: '2', nome: 'Placa Solar B', local: 'Galpão', status: 'Manutenção' },
  { id: '3', nome: 'Placa Solar C', local: 'Campo Leste', status: 'Inativa' },
];

const corStatus: Record<Status, string> = {
  Ativa: '#4CAF50',
  Manutenção: '#FFEB3B',
  Inativa: '#F44336',
};

export default function TelaResumoPlacas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [placaSelecionada, setPlacaSelecionada] = useState<Placa | null>(null);

  const [modalFeedbackVisible, setModalFeedbackVisible] = useState(false);
  const [feedbackMensagem, setFeedbackMensagem] = useState('');

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

  const confirmarProblema = () => {
    const nome = placaSelecionada?.nome ?? 'placa';
    mostrarFeedback(`Problema informado para: ${nome}`);
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dadosPlacas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => abrirModal(item)}
                accessibilityLabel={`Informar problema na ${item.nome}`}
              >
                <Wrench color="#5D4A20" size={18} />
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

      {/* Modal de confirmação */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja informar problema na placa solar{' '}
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

      {/* Modal de feedback */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcece1',
    paddingTop: 36,
    padding: 16,
  },
  card: {
    backgroundColor: '#fae483ff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: 'rgba(212, 160, 34, 0.3)',
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
    color: '#5D4A20',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8A7C5A',
    marginTop: 4,
  },
  iconButton: {
    backgroundColor: 'rgba(212, 160, 34, 0.2)',
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
    color: '#5D4A20',
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
    backgroundColor: '#fae483ff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#5D4A20',
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
    backgroundColor: '#4CAF50',
  },
  buttonNao: {
    backgroundColor: '#F44336',
  },
  buttonOk: {
    backgroundColor: '#5D4A20',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
