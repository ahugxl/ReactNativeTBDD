import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={s.center}>
      <Text style={s.title}>Đã có lỗi xảy ra</Text>
      <Text style={s.msg}>{message}</Text>
      <Pressable style={s.btn} onPress={onRetry}><Text style={s.btnText}>THỬ LẠI</Text></Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", color: colors.text },
  msg: { color: colors.muted, textAlign: "center" },
  btn: { marginTop: 8, backgroundColor: colors.red, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 28 },
  btnText: { color: "#fff", fontWeight: "700" },
});
