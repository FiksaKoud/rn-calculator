import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { TextoTematico } from '@/components/themed-text';
import { VistaTematica } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTema } from '@/hooks/use-tema';

export function SeccionDesplegable({ children: contenido, titulo }) {
  const [estaAbierta, setEstaAbierta] = useState(false);
  const tema = useTema();

  return (
    <VistaTematica>
      <Pressable
        style={({ pressed }) => [estilos.encabezado, pressed && estilos.encabezadoPresionado]}
        onPress={() => setEstaAbierta((valor) => !valor)}>
        <VistaTematica tipo="backgroundElement" style={estilos.boton}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={tema.text}
            style={{ transform: [{ rotate: estaAbierta ? '-90deg' : '90deg' }] }}
          />
        </VistaTematica>

        <TextoTematico tipo="pequeno">{titulo}</TextoTematico>
      </Pressable>
      {estaAbierta && (
        <Animated.View entering={FadeIn.duration(200)}>
          <VistaTematica tipo="backgroundElement" style={estilos.contenido}>
            {contenido}
          </VistaTematica>
        </Animated.View>
      )}
    </VistaTematica>
  );
}

const estilos = StyleSheet.create({
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  encabezadoPresionado: {
    opacity: 0.7,
  },
  boton: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});
