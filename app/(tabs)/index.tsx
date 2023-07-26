import { Platform, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import * as React from "react"
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useRef } from "react";

export default function TabOneScreen() {
  const animationRef = React.useRef<LottieView>(null)
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: Platform.select({ android: 30 }),
        }}
        refreshControl={
          <RefreshControl onRefresh={()=> {animationRef.current?.play()}} refreshing={false} tintColor={"transparent"} />
        }
      >
        <LottieView
          ref={animationRef}
          source={require("../../lottie-animations/threads.json")}
          loop={false}
          autoPlay
          style={{
            width: 90,
            height: 90,
            alignSelf: "center",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
