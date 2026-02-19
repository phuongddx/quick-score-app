import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// NativeWind's react-native-css-interop accesses SafeAreaView from react-native at startup
// to register className support, which triggers React Native 0.81's deprecation warning.
// This is a known third-party issue — suppress it since all app code already uses
// react-native-safe-area-context directly.
LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

// Prevent auto-hide until the app is ready
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 2,
      refetchOnWindowFocus: false, // not applicable to React Native
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen immediately (no async font loading needed)
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" backgroundColor="#0D1117" />
        <Stack>
          {/* Tab group — no header at root level */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* Match detail — full-screen card */}
          <Stack.Screen
            name="match/[id]"
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          {/* Global search — full-screen push */}
          <Stack.Screen
            name="search"
            options={{
              headerShown: false,
              presentation: 'card',
              animation: 'slide_from_right',
            }}
          />
          {/* Pro plans paywall — fullscreen modal slide-up */}
          <Stack.Screen
            name="pro-plans"
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
