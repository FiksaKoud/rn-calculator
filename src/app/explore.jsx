import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EnlaceExterno } from '@/components/external-link';
import { TextoTematico } from '@/components/themed-text';
import { VistaTematica } from '@/components/themed-view';
import { SeccionDesplegable } from '@/components/ui/collapsible';
import { InsigniaWeb } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTema } from '@/hooks/use-tema';

export default function PantallaExplorar() {
  const insetsAreaSegura = useSafeAreaInsets();
  const insets = {
    ...insetsAreaSegura,
    bottom: insetsAreaSegura.bottom + BottomTabInset + Spacing.three,
  };
  const tema = useTema();

  const estiloContenido = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[estilos.vistaDesplazable, { backgroundColor: tema.background }]}
      contentInset={insets}
      contentContainerStyle={[estilos.contenido, estiloContenido]}>
      <VistaTematica style={estilos.contenedor}>
        <VistaTematica style={estilos.encabezado}>
          <TextoTematico tipo="subtitulo">Explorar</TextoTematico>
          <TextoTematico style={estilos.textoCentrado} colorTema="textSecondary">
            Información y recursos para usar la calculadora.
          </TextoTematico>
          <EnlaceExterno href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && estilos.presionado}>
              <VistaTematica tipo="backgroundElement" style={estilos.botonEnlace}>
                <TextoTematico tipo="enlace">Documentación de Expo</TextoTematico>
                <SymbolView
                  tintColor={tema.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </VistaTematica>
            </Pressable>
          </EnlaceExterno>
        </VistaTematica>

        <VistaTematica style={estilos.secciones}>
          <SeccionDesplegable titulo="Operaciones">
            <TextoTematico tipo="pequeno">
              Usa el teclado para sumar, restar, multiplicar o dividir. Puedes encadenar operaciones,
              introducir decimales y repetir la última operación con el botón igual.
            </TextoTematico>
          </SeccionDesplegable>

          <SeccionDesplegable titulo="Compatibilidad">
            <VistaTematica tipo="backgroundElement" style={estilos.contenidoDesplegable}>
              <TextoTematico tipo="pequeno">
                La aplicación funciona en iOS, Android y web.
              </TextoTematico>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={estilos.imagenTutorial}
              />
            </VistaTematica>
          </SeccionDesplegable>

          <SeccionDesplegable titulo="Tema de color">
            <TextoTematico tipo="pequeno">
              La interfaz se adapta automáticamente al tema claro u oscuro del dispositivo.
            </TextoTematico>
          </SeccionDesplegable>
        </VistaTematica>
        {Platform.OS === 'web' && <InsigniaWeb />}
      </VistaTematica>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  vistaDesplazable: {
    flex: 1,
  },
  contenido: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contenedor: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  encabezado: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  textoCentrado: {
    textAlign: 'center',
  },
  presionado: {
    opacity: 0.7,
  },
  botonEnlace: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  secciones: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  contenidoDesplegable: {
    alignItems: 'center',
  },
  imagenTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
});
