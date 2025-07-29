import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import Routes from '../routes/Routex';

import { View } from 'react-native';

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

