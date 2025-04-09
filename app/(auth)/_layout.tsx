// app/(auth)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn,'isLoggedInInsideTabs')

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack />;
}