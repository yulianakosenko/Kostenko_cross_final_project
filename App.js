import "react-native-gesture-handler";

import { SafeAreaView, StyleSheet, View } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.appWrapper}>
        <AppNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: "#EEF2F1",

    alignItems: "center",
  },

  appWrapper: {
    flex: 1,

    width: "100%",

    maxWidth: 430,

    backgroundColor: "#F8FAF8",

    overflow: "hidden",
  },
});
