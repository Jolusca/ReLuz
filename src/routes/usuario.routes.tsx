import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'

import GraphScreen from '../pags_usuario/Graficos';
import Status      from '../pags_usuario/Status';
import WeatherScreen from '../pags_usuario/Clima';
import  Historico  from '../pags_usuario/Historico';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Usuario(){

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name=" "
                component={GraphScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#708090',
                        height: 80,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    drawerIcon: ({ color, size }) => <Feather name="inbox" color={color} size={size} />,
                    drawerLabel: 'Geração de Energia'
                }}
            />
            <Drawer.Screen 
                name="Status de placas"
                component={Status}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="smartphone" color={color} size={size} />,
                    drawerLabel: 'Veja o status de placas'
                }}
            />
            <Drawer.Screen 
                name="Clima"
                component={WeatherScreen}
                options={{
                    headerShown: false, 

                    drawerIcon: ({ color, size }) => <Feather name="target" color={color} size={size} />,
                    drawerLabel: 'Informações de Clima'
                }}
            />
            <Drawer.Screen 
                name="  "
                component={Historico}
                options={{
                    headerShown: false, 
                    headerStyle: {
                        backgroundColor: '#708090',
                        height: 70,
                       
                    },
                    drawerIcon: ({ color, size }) => <Feather name="book" color={color} size={size} />,
                    drawerLabel: 'Histórico de Geração'
                }}
            />


        </Drawer.Navigator>
    )
}