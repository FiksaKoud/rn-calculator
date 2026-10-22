import { View, StyleSheet } from 'react-native';

import { TextoTematico } from './themed-text';
import { VistaTematica } from './themed-view';

import { Spacing } from '@/constants/theme';

export function FilaIndicacion({ titulo = 'Edita este archivo', indicacion = 'app/index.jsx' }) {
  return (
    <View style={estilos.filaPaso}>
      <TextoTematico tipo="pequeno">{titulo}</TextoTematico>
      <VistaTematica tipo="backgroundSelected" style={estilos.fragmentoCodigo}>
        <TextoTematico colorTema="textSecondary">{indicacion}</TextoTematico>
      </VistaTematica>
    </View>
  );
}

const estilos = StyleSheet.create({
  filaPaso: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fragmentoCodigo: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});
