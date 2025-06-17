
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApcedWdIT3HGZx9oTQBPbgFkyLlKp3PlI",
  authDomain: "testereluz.firebaseapp.com",
  projectId: "testereluz",
  storageBucket: "testereluz.firebasestorage.app",
  messagingSenderId: "200496638765",
  appId: "1:200496638765:web:98bb02d7a0afe80d0f81a4",
  measurementId: "G-2Q4TC3CHEX"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




export default function GraphScreen() {
 
  const [numeroLido, setNumeroLido] = useState(null);
  const [inputNumero, setInputNumero] = useState('');

  useEffect(() => {
    lerNumero();
  }, []);

  const enviarNumero = async () => {
    const valor = parseFloat(inputNumero);
    if (isNaN(valor)) {
      alert("Digite um número válido!");
      return;
    }

    try {
      await setDoc(doc(db, "dados_de_teste", "Energia"), { voltagem: valor });
      console.log("Valor enviado:", valor);
      setInputNumero('');
      lerNumero(); // atualiza número lido
    } catch (error) {
      console.error("Erro ao enviar número:", error);
    }
  };

  const lerNumero = async () => {
    try {
      const docRef = doc(db, "dados_de_teste", "Energia");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const valor = docSnap.data().voltagem;
        console.log("Valor lido:", valor, "°");
        setNumeroLido(valor);
      } else {
        console.log("Documento não encontrado.");
        setNumeroLido(null);
      }
    } catch (error) {
      console.error("Erro ao ler número:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Enviar um Valor de Voltagem teste:</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputNumero}
        onChangeText={setInputNumero}
        placeholder="Digite um número"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.botao} onPress={enviarNumero}>
        <Text style={styles.botaoTexto}>Enviar voltagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoClaro} onPress={lerNumero}>
        <Text style={styles.botaoTextoClaro}>Ler Valor já armazenado</Text>
      </TouchableOpacity>

      <View style={styles.caixaLida}>
        <Text style={styles.labelLido}>voltagem lida do Firestore:</Text>
        <Text style={styles.numeroLido}>
          {numeroLido !== null ? numeroLido+" V" : '...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
    color: '#FFAD00',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#FEDE97',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#FEDE97'
  },
  botao: {
    backgroundColor: '#FEDE97',
    paddingVertical: 12,
    paddingHorizontal: 52,
    borderRadius: 10,
    marginBottom: 10,
  }, 
  botaoTexto: {
    color: '#000',
    fontSize: 18,
  },
  botaoClaro: {
    backgroundColor: '#FFC341',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  botaoTextoClaro: {
    color: '#e00',
    fontSize: 18,
  },
  caixaLida: {
    backgroundColor: '#FEDE97',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    width: '80%',
  },
  labelLido: {
    fontSize: 16,
    color: '#660',
    marginBottom: 8,
  },
  numeroLido: {
    fontSize: 36,
    color: 'c00',
    fontWeight: 'bold',
  },
});