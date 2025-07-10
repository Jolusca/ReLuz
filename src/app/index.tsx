import React from 'react';
import Routes from '../routes/Routex';
import { AuthProvider } from '../context/AuthContext';

import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';

// export default function App() {
//   return (
//     <View>
//       <AuthProvider>
//         <Routes />
//       </AuthProvider>
//     </View>
//   );
// }

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </View>
  );
}

