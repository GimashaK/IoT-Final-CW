import React from 'react';

import LoginScreen from '@/components/login';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <LoginScreen></LoginScreen>
    
  );
}
