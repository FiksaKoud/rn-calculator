import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTema() {
  const esquema = useColorScheme();
  const temaActual = esquema === 'dark' ? 'dark' : 'light';

  return Colors[temaActual];
}
