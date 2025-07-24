import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LogoutScreen() {
  const { setTipo } = useAuth();

  useEffect(() => {
    setTipo(null); // Redireciona para a tela de Login
  }, []);

  return null; // Nada na tela
}
