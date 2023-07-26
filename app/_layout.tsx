import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    // Use SplashScreen.preventAutoHideAsync() to prevent the splash screen from auto-hiding
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e); // Handle any errors that occur during preventing auto-hiding
      }
    };

    if (!loaded) {
      hideSplashScreen(); // Prevent auto-hiding if the fonts are still loading
    } else {
      SplashScreen.hideAsync(); // Hide the splash screen once the fonts have loaded
    }

    if (error) {
      throw error; // Throw any errors caught during font loading
    }
  }, [loaded, error]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
    {/* No need to use <SplashScreen /> here */}
    {/* SplashScreen will be shown until it's hidden in the useEffect */}
    {loaded && <RootLayoutNav />}
  </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
