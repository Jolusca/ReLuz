import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons'

import Lista_Placa from '../pags_tecnico/Lista_Placas';
import Perfil_Tec from '../pags_tecnico/Perfil';
const Drawer = createDrawerNavigator();

export default function DrawerRoutes_Tecnico(){

    return (
        <Drawer.Navigator 
        screenOptions={{
            drawerStyle: {
            backgroundColor: 'lightblue',
            }
        }}
        >
            <Drawer.Screen 
                name="Lista de Placas"
                component={Lista_Placa}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="info" color={color} size={size} />,
                    drawerLabel: 'Lista de Placas - Tec'
                }}
            />
            <Drawer.Screen 
                name="Ver Perfil"
                component={Perfil_Tec}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="eye" color={color} size={size} />,
                    drawerLabel: 'perfil do técnico'
                }}
            />


        </Drawer.Navigator>
    )
}