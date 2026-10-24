import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={s.center}>
      <ActivityIndicator size="large" color={colors.red} />
      <Text style={s.text}>Đang tải...</Text>
    </View>
  );
}
const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#fff" },
  text: { color: colors.muted, fontSize: 15 },
});
