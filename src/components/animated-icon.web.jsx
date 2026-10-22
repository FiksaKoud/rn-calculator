import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURACION = 300;

export function CapaInicioAnimada() {
  return null;
}

const fotograma = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const fotogramaLogo = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const fotogramaBrillo = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURACION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
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

      <Animated.View style={estilos.fondo} entering={fotograma.duration(DURACION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={estilos.contenedorImagen} entering={fotogramaLogo.duration(DURACION)}>
        <Image style={estilos.imagen} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
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
  },
  imagen: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  fondo: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});
