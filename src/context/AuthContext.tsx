import React, { createContext, useContext, useState, ReactNode } from 'react';

type TipoUsuario = 'tecnico' | 'usuario' | null;

interface AuthContextProps {
  tipo: TipoUsuario;
  setTipo: (tipo: TipoUsuario) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tipo, setTipo] = useState<TipoUsuario>(null);

  return (
    <AuthContext.Provider value={{ tipo, setTipo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
