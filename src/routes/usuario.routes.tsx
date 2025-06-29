import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'

import GraphScreen from '../pags_usuario/Graficos';
import Status      from '../pags_usuario/Status';
import WeatherScreen from '../pags_usuario/Clima';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Usuario(){

    return (
        <Drawer.Navigator >
            <Drawer.Screen 
                name="Ver Gráficos"
                component={GraphScreen}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="inbox" color={color} size={size} />,
                    drawerLabel: 'oh neymar'
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
                    drawerIcon: ({ color, size }) => <Feather name="target" color={color} size={size} />,
                    drawerLabel: 'Informações de Clima'
                }}
            />


        </Drawer.Navigator>
    )
}