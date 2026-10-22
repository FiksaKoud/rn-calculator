# Calculadora para iPhone

Calculadora móvil con una interfaz inspirada en la calculadora del iPhone y basada en la lógica
del vídeo de referencia.

Incluye suma, resta, multiplicación, división, operaciones encadenadas, decimales, cambio de
signo, borrado del último dígito y repetición de la última operación.

## Inicio rápido

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia Expo:

   ```bash
   npx expo start
   ```

Desde el menú de Expo puedes abrir la aplicación en un simulador de iOS o Android, o en un
dispositivo con Expo Go.

La pantalla principal está en `src/app/index.jsx`, la lógica en
`src/hooks/use-calculadora.js` y los componentes reutilizables en `src/components/`.
La aplicación usa [Expo Router](https://docs.expo.dev/router/introduction) para la navegación.

## Comprobaciones

- Lint: `npx expo lint`
- Comprobación de TypeScript: `npx tsc --noEmit`

## Más información

Consulta la [documentación de Expo](https://docs.expo.dev/) para más información sobre el
desarrollo de aplicaciones.
