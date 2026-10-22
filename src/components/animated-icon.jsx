import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const FACTOR_ESCALA_INICIAL = Dimensions.get('screen').height / 90;
const DURACION = 600;

export function CapaInicioAnimada() {
  const [animar, establecerAnimacion] = useState(false);
  const [visible, establecerVisibilidad] = useState(true);

  if (!visible) return null;

  const fotogramaInicio = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const imagen = <Image style={estilos.imagen} source={require('@/assets/images/expo-logo.png')} />;

  return animar ? (
    <Animated.View
      entering={fotogramaInicio.duration(DURACION).withCallback((terminado) => {
        'worklet';
        if (terminado) {
          scheduleOnRN(establecerVisibilidad, false);
        }
      })}
      style={estilos.capaInicio}>
      {imagen}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          establecerAnimacion(true);
        });
      }}
      style={estilos.capaInicio}>
      {imagen}
    </View>
  );
}

const fotograma = new Keyframe({
  0: {
    transform: [{ scale: FACTOR_ESCALA_INICIAL }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const fotogramaLogo = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const fotogramaBrillo = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function IconoAnimado() {
  return (
    <View style={estilos.contenedorIcono}>
      <Animated.View entering={fotogramaBrillo.duration(60 * 1000 * 4)} style={estilos.brillo}>
        <Image style={estilos.brillo} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={fotograma.duration(DURACION)} style={estilos.fondo} />
      <Animated.View style={estilos.contenedorImagen} entering={fotogramaLogo.duration(DURACION)}>
        <Image style={estilos.imagen} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorImagen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  brillo: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  contenedorIcono: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  imagen: {
    width: 76,
    height: 71,
  },
  fondo: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  capaInicio: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
