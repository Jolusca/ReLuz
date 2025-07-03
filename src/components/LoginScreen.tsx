import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Routex';

import { Video, ResizeMode } from 'expo-av';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { setTipo } = useAuth();
  const videoRef = useRef(null);

  return (
    <View style={styles.container}>
      {/* 🎥 Vídeo de fundo */}
      <Video
        ref={videoRef}
        source={require('../../assets/videos/placas.mp4')} // 📁 coloque o vídeo em: assets/videos/fundo-login.mp4
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />

      {/* 🔲 Overlay escura */}
      <View style={styles.overlay} />

      {/* Conteúdo do login */}
      <View style={styles.content}>
        <Text style={styles.title}>Escolha o tipo de login:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Entrar como Técnico" onPress={() => setTipo('tecnico')} />
          <View style={{ height: 15 }} />
          <Button title="Entrar como Usuário" onPress={() => setTipo('usuario')} />
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    zIndex: -2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '80%',
  },
});
