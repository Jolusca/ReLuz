// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#000000',
            paddingTop: 10,
            paddingBottom: 40,
            paddingHorizontal: 24,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            shadowColor: '#facc15',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.3,
            shadowRadius: 18,
            elevation: 10,
            justifyContent: 'space-between',
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const getIconName = () => {
              switch (route.name) {
                case 'graph':
                  return 'solar-panel';
                case 'weather':
                  return 'cloud-sun-rain';
                default:
                  return 'circle';
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: isFocused ? 'rgba(99, 68, 1, 0.14)' : 'transparent',
                  padding: 10,
                  borderRadius: 12,
                }}
              >
                <FontAwesome6
                  name={getIconName()}
                  size={24}
                  color={isFocused ? '#facc15' : '#999999'}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: isFocused ? '#facc15' : '#999999',
                    marginTop: 4,
                  }}
                >
                  {options.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="graph" options={{ title: 'Gráficos' }} />
      <Tabs.Screen name="weather" options={{ title: 'Clima' }} />
    </Tabs>
  );
}
