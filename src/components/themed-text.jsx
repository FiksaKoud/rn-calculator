import { Platform, StyleSheet, Text } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useTema } from '@/hooks/use-tema';

export function TextoTematico({ style, tipo = 'normal', colorTema, ...rest }) {
  const tema = useTema();

  return <Text style={[{ color: tema[colorTema ?? 'text'] }, estilos[tipo], style]} {...rest} />;
}

const estilos = StyleSheet.create({
  pequeno: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  pequenoNegrita: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  normal: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  titulo: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitulo: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  enlace: {
    lineHeight: 30,
    fontSize: 14,
  },
  enlacePrincipal: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  codigo: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
