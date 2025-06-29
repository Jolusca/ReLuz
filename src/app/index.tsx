import React from 'react';
import Routes from '../routes/Routex';
import { AuthProvider } from '../context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
