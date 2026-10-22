import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCalculadora } from '@/hooks/use-calculadora';

const COLORES = {
  fondo: '#000000',
  numero: '#292929',
  utilidad: '#A5A5A5',
  operador: '#FF9500',
  texto: '#FFFFFF',
  textoUtilidad: '#111111',
  textoSecundario: '#8D8D8D',
  operadorSeleccionado: '#F5F5F5',
};

function BotonCalculadora({
  etiqueta,
  etiquetaAccesible,
  variante,
  tamano,
  ancho = false,
  seleccionado = false,
  alPulsar,
}) {
  const esUtilidad = variante === 'utilidad';
  const esSeleccionado = variante === 'operador' && seleccionado;

  return (
    <Pressable
      accessibilityLabel={etiquetaAccesible}
      accessibilityRole="button"
      accessibilityState={seleccionado ? { selected: true } : undefined}
      onPress={alPulsar}
      style={({ pressed }) => [
        estilos.boton,
        {
          width: ancho ? tamano * 2 + 10 : tamano,
          height: tamano,
          borderRadius: tamano / 2,
          backgroundColor: esSeleccionado
            ? COLORES.operadorSeleccionado
            : variante === 'operador'
              ? COLORES.operador
              : esUtilidad
                ? COLORES.utilidad
                : COLORES.numero,
        },
        ancho && estilos.botonAncho,
        pressed && estilos.botonPresionado,
      ]}>
      <Text
        allowFontScaling={false}
        style={[
          estilos.etiquetaBoton,
          {
            fontSize: etiqueta === 'BOR' ? tamano * 0.22 : tamano * 0.38,
            color: esUtilidad ? COLORES.textoUtilidad : esSeleccionado ? COLORES.operador : COLORES.texto,
          },
          ancho && estilos.etiquetaAncha,
        ]}>
        {etiqueta}
      </Text>
    </Pressable>
  );
}

export default function PantallaInicio() {
  const { width: anchoPantalla } = useWindowDimensions();
  const { estado, enviarAccion } = useCalculadora();
  const anchoDisponible = anchoPantalla > 0 ? anchoPantalla : 390;
  const tamanoBoton = Math.min(78, (anchoDisponible - 44 - 30) / 4);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={[estilos.calculadora, { width: tamanoBoton * 4 + 30 }]}>
        <View style={estilos.pantalla} accessibilityLiveRegion="polite">
          <Text numberOfLines={1} style={estilos.expresion}>
            {estado.expresion || ' '}
          </Text>
          <Text
            adjustsFontSizeToFit
            allowFontScaling={false}
            minimumFontScale={0.42}
            numberOfLines={1}
            style={estilos.resultado}>
            {estado.pantalla}
          </Text>
        </View>

        <View style={estilos.teclado}>
          <View style={estilos.fila}>
            <BotonCalculadora
              etiquetaAccesible="Borrar todo"
              etiqueta={estado.pantalla === '0' && !estado.expresion ? 'AC' : 'C'}
              alPulsar={() => enviarAccion({ tipo: 'borrarTodo' })}
              tamano={tamanoBoton}
              variante="utilidad"
            />
            <BotonCalculadora
              etiquetaAccesible="Cambiar signo"
              etiqueta="+/−"
              alPulsar={() => enviarAccion({ tipo: 'cambiarSigno' })}
              tamano={tamanoBoton}
              variante="utilidad"
            />
            <BotonCalculadora
              etiquetaAccesible="Borrar último dígito"
              etiqueta="BOR"
              alPulsar={() => enviarAccion({ tipo: 'borrarDigito' })}
              tamano={tamanoBoton}
              variante="utilidad"
            />
            <BotonCalculadora
              etiquetaAccesible="Dividir"
              etiqueta="÷"
              alPulsar={() => enviarAccion({ tipo: 'operador', operador: '÷' })}
              seleccionado={estado.operadorPendiente === '÷'}
              tamano={tamanoBoton}
              variante="operador"
            />
          </View>

          <View style={estilos.fila}>
            {['7', '8', '9'].map((digito) => (
              <BotonCalculadora
                key={digito}
                etiquetaAccesible={digito}
                etiqueta={digito}
                alPulsar={() => enviarAccion({ tipo: 'digito', digito })}
                tamano={tamanoBoton}
                variante="numero"
              />
            ))}
            <BotonCalculadora
              etiquetaAccesible="Multiplicar"
              etiqueta="×"
              alPulsar={() => enviarAccion({ tipo: 'operador', operador: '×' })}
              seleccionado={estado.operadorPendiente === '×'}
              tamano={tamanoBoton}
              variante="operador"
            />
          </View>

          <View style={estilos.fila}>
            {['4', '5', '6'].map((digito) => (
              <BotonCalculadora
                key={digito}
                etiquetaAccesible={digito}
                etiqueta={digito}
                alPulsar={() => enviarAccion({ tipo: 'digito', digito })}
                tamano={tamanoBoton}
                variante="numero"
              />
            ))}
            <BotonCalculadora
              etiquetaAccesible="Restar"
              etiqueta="−"
              alPulsar={() => enviarAccion({ tipo: 'operador', operador: '−' })}
              seleccionado={estado.operadorPendiente === '−'}
              tamano={tamanoBoton}
              variante="operador"
            />
          </View>

          <View style={estilos.fila}>
            {['1', '2', '3'].map((digito) => (
              <BotonCalculadora
                key={digito}
                etiquetaAccesible={digito}
                etiqueta={digito}
                alPulsar={() => enviarAccion({ tipo: 'digito', digito })}
                tamano={tamanoBoton}
                variante="numero"
              />
            ))}
            <BotonCalculadora
              etiquetaAccesible="Sumar"
              etiqueta="+"
              alPulsar={() => enviarAccion({ tipo: 'operador', operador: '+' })}
              seleccionado={estado.operadorPendiente === '+'}
              tamano={tamanoBoton}
              variante="operador"
            />
          </View>

          <View style={estilos.fila}>
            <BotonCalculadora
              etiquetaAccesible="0"
              etiqueta="0"
              alPulsar={() => enviarAccion({ tipo: 'digito', digito: '0' })}
              tamano={tamanoBoton}
              variante="numero"
              ancho
            />
            <BotonCalculadora
              etiquetaAccesible="Punto decimal"
              etiqueta="."
              alPulsar={() => enviarAccion({ tipo: 'decimal' })}
              tamano={tamanoBoton}
              variante="numero"
            />
            <BotonCalculadora
              etiquetaAccesible="Igual"
              etiqueta="="
              alPulsar={() => enviarAccion({ tipo: 'igual' })}
              tamano={tamanoBoton}
              variante="operador"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORES.fondo,
  },
  calculadora: {
    flex: 1,
    maxWidth: '100%',
  },
  pantalla: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 28,
  },
  expresion: {
    width: '100%',
    minHeight: 30,
    color: COLORES.textoSecundario,
    fontSize: 22,
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  resultado: {
    width: '100%',
    color: COLORES.texto,
    fontSize: 68,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    textAlign: 'right',
  },
  teclado: {
    gap: 12,
    paddingBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  boton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAncho: {
    alignItems: 'flex-start',
    paddingLeft: 25,
  },
  etiquetaBoton: {
    fontWeight: '400',
    textAlign: 'center',
  },
  etiquetaAncha: {
    textAlign: 'left',
  },
  botonPresionado: {
    opacity: 0.68,
  },
});
