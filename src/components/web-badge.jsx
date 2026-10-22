import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { TextoTematico } from './themed-text';
import { VistaTematica } from './themed-view';

import { Spacing } from '@/constants/theme';

export function InsigniaWeb() {
  const esquema = useColorScheme();

  return (
    <VistaTematica style={estilos.contenedor}>
      <TextoTematico tipo="codigo" colorTema="textSecondary" style={estilos.textoVersion}>
        v{version}
      </TextoTematico>
      <Image
        source={
          esquema === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={estilos.imagenInsignia}
      />
    </VistaTematica>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  textoVersion: {
    textAlign: 'center',
  },
  imagenInsignia: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});
