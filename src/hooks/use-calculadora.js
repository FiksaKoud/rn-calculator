import { useReducer } from 'react';

const ESTADO_INICIAL = {
  pantalla: '0',
  expresion: '',
  acumulador: null,
  operadorPendiente: null,
  reemplazarPantalla: false,
  ultimoOperador: null,
  ultimoOperando: null,
};

function formatearResultado(valor) {
  if (!Number.isFinite(valor)) return 'Error';
  const redondeado = Number(valor.toPrecision(12));
  return Object.is(redondeado, -0) ? '0' : String(redondeado);
}

function calcular(izquierdo, derecho, operador) {
  switch (operador) {
    case '+':
      return izquierdo + derecho;
    case '−':
      return izquierdo - derecho;
    case '×':
      return izquierdo * derecho;
    case '÷':
      return izquierdo / derecho;
  }
}

function reducirCalculadora(estado, accion) {
  if (accion.tipo === 'borrarTodo') return ESTADO_INICIAL;
  if (estado.pantalla === 'Error') {
    if (accion.tipo === 'digito' || accion.tipo === 'decimal') {
      return reducirCalculadora(ESTADO_INICIAL, accion);
    }
    return estado;
  }

  switch (accion.tipo) {
    case 'digito': {
      const actual = estado.reemplazarPantalla ? '0' : estado.pantalla;
      const digitos = actual.replace(/[-.]/g, '');
      if (digitos.length >= 15) return { ...estado, reemplazarPantalla: false };
      const pantalla =
        actual === '0' ? accion.digito : actual === '-0' ? `-${accion.digito}` : actual + accion.digito;
      return {
        ...estado,
        pantalla,
        expresion: estado.operadorPendiente ? estado.expresion : '',
        reemplazarPantalla: false,
        ultimoOperador: null,
        ultimoOperando: null,
      };
    }
    case 'decimal': {
      const actual = estado.reemplazarPantalla ? '0' : estado.pantalla;
      if (actual.includes('.')) return { ...estado, reemplazarPantalla: false };
      return {
        ...estado,
        pantalla: `${actual}.`,
        expresion: estado.operadorPendiente ? estado.expresion : '',
        reemplazarPantalla: false,
        ultimoOperador: null,
        ultimoOperando: null,
      };
    }
    case 'operador': {
      const actual = Number(estado.pantalla);
      if (estado.operadorPendiente && !estado.reemplazarPantalla && estado.acumulador !== null) {
        const resultado = formatearResultado(
          calcular(estado.acumulador, actual, estado.operadorPendiente)
        );
        if (resultado === 'Error') return { ...estado, pantalla: resultado };
        const acumulador = Number(resultado);
        return {
          ...estado,
          pantalla: resultado,
          expresion: `${resultado} ${accion.operador}`,
          acumulador,
          operadorPendiente: accion.operador,
          reemplazarPantalla: true,
          ultimoOperador: null,
          ultimoOperando: null,
        };
      }
      const acumulador = estado.operadorPendiente ? (estado.acumulador ?? actual) : actual;
      return {
        ...estado,
        expresion: `${formatearResultado(acumulador)} ${accion.operador}`,
        acumulador,
        operadorPendiente: accion.operador,
        reemplazarPantalla: true,
        ultimoOperador: null,
        ultimoOperando: null,
      };
    }
    case 'igual': {
      if (estado.operadorPendiente && estado.acumulador !== null) {
        const operando = estado.reemplazarPantalla ? estado.acumulador : Number(estado.pantalla);
        const resultado = formatearResultado(
          calcular(estado.acumulador, operando, estado.operadorPendiente)
        );
        return {
          ...estado,
          pantalla: resultado,
          expresion: `${formatearResultado(estado.acumulador)} ${estado.operadorPendiente} ${formatearResultado(operando)} =`,
          acumulador: null,
          operadorPendiente: null,
          reemplazarPantalla: true,
          ultimoOperador: estado.operadorPendiente,
          ultimoOperando: operando,
        };
      }
      if (estado.ultimoOperador && estado.ultimoOperando !== null) {
        const izquierdo = Number(estado.pantalla);
        const resultado = formatearResultado(
          calcular(izquierdo, estado.ultimoOperando, estado.ultimoOperador)
        );
        return {
          ...estado,
          pantalla: resultado,
          expresion: `${formatearResultado(izquierdo)} ${estado.ultimoOperador} ${formatearResultado(estado.ultimoOperando)} =`,
          reemplazarPantalla: true,
        };
      }
      return estado;
    }
    case 'cambiarSigno': {
      const valor = Number(estado.pantalla);
      return {
        ...estado,
        pantalla: formatearResultado(-valor),
        expresion: estado.operadorPendiente ? estado.expresion : '',
        reemplazarPantalla: false,
        ultimoOperador: null,
        ultimoOperando: null,
      };
    }
    case 'borrarDigito': {
      const pantalla = estado.pantalla.length > 1 ? estado.pantalla.slice(0, -1) : '0';
      return {
        ...estado,
        pantalla: pantalla === '-' ? '0' : pantalla,
        expresion: estado.operadorPendiente ? estado.expresion : '',
        reemplazarPantalla: false,
        ultimoOperador: null,
        ultimoOperando: null,
      };
    }
  }
}

export function useCalculadora() {
  const [estado, enviarAccion] = useReducer(reducirCalculadora, ESTADO_INICIAL);
  return { estado, enviarAccion };
}
