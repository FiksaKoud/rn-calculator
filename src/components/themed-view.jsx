import { View } from 'react-native';

import { useTema } from '@/hooks/use-tema';

export function VistaTematica({ style, tipo = 'background', ...otrasProps }) {
  const tema = useTema();

  return <View style={[{ backgroundColor: tema[tipo] }, style]} {...otrasProps} />;
}
