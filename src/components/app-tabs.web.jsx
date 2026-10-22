import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

import { EnlaceExterno } from './external-link';
import { TextoTematico } from './themed-text';
import { VistaTematica } from './themed-view';

export default function PestanasAplicacion() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <ListaPestanasPersonalizada>
          <TabTrigger name="home" href="/" asChild>
            <BotonPestana>Inicio</BotonPestana>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <BotonPestana>Explorar</BotonPestana>
          </TabTrigger>
        </ListaPestanasPersonalizada>
      </TabList>
    </Tabs>
  );
}

export function BotonPestana({ children, isFocused: estaEnfocada, ...props }) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && estilos.presionado}>
      <VistaTematica
        tipo={estaEnfocada ? 'backgroundSelected' : 'backgroundElement'}
        style={estilos.vistaBotonPestana}>
        <TextoTematico tipo="pequeno" colorTema={estaEnfocada ? 'text' : 'textSecondary'}>
          {children}
        </TextoTematico>
      </VistaTematica>
    </Pressable>
  );
}

export function ListaPestanasPersonalizada(props) {
  const esquema = useColorScheme();
  const colores = Colors[esquema === 'dark' ? 'dark' : 'light'];

  return (
    <View {...props} style={estilos.contenedorLista}>
      <VistaTematica tipo="backgroundElement" style={estilos.contenedorInterior}>
        <TextoTematico tipo="pequenoNegrita" style={estilos.textoMarca}>
          Calculadora
        </TextoTematico>

        {props.children}

        <EnlaceExterno href="https://docs.expo.dev" asChild>
          <Pressable style={estilos.botonEnlaceExterno}>
            <TextoTematico tipo="enlace">Documentación</TextoTematico>
            <SymbolView
              tintColor={colores.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </EnlaceExterno>
      </VistaTematica>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorLista: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contenedorInterior: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  textoMarca: {
    marginRight: 'auto',
  },
  presionado: {
    opacity: 0.7,
  },
  vistaBotonPestana: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  botonEnlaceExterno: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});
