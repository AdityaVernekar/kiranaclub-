import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppThemeProvider } from "./src/context/ThemeContext";
import React, { useEffect, useState } from "react";
import Navigation from "./src/navigation";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Video from "react-native-video"

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator();
export default function App() {


  const [showSplashScreen, setShowSplashScreen] = useState(true);


  return (
    showSplashScreen ? (
      <View style={styles.container}>
        <Video
          source={require("./src/assets/videos/splash.mp4")}
          style={{
            width: '100%',
            height: '100%',
          }}
          repeat={false}
          resizeMode="cover"
          paused={false}
          muted={true}
          onEnd={() => setShowSplashScreen(false)}
        />

      </View>
    ) : (

      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <Navigation />
        </AppThemeProvider>
      </QueryClientProvider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});