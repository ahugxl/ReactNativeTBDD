import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { PHONES } from "./src/data/phones";
import { USING_API } from "./src/api/phoneApi";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

const EXERCISES = [
  { id: 1, title: "Bài 1: Select Phone (dữ liệu cục bộ)", render: () => <SelectPhoneApp phone={PHONES[0]} /> },
  { id: 2, title: `Bài 2: Select Phone + API ${USING_API ? "(mockapi)" : "(offline)"}`, render: () => <SelectPhoneApi /> },
  { id: 3, title: "Bài 3: Bottom Tab Navigation", render: () => <BottomTabApp /> },
  { id: 4, title: "Bài 4: Stack + Tab + Passing Params", render: () => <StackTabApp /> },
  { id: 5, title: "Bài 5: Drawer Navigation", render: () => <DrawerApp /> },
];

export default function App() {
  const [current, setCurrent] = useState<number | null>(null);
  const ex = EXERCISES.find((e) => e.id === current);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={s.root} edges={["top"]}>
        {ex ? (
          <>
            <Pressable style={s.bar} onPress={() => setCurrent(null)}>
              <Text style={s.barText}>‹ Menu · Bài {ex.id}</Text>
            </Pressable>
            <View style={{ flex: 1 }}>{ex.render()}</View>
          </>
        ) : (
          <View style={s.menu}>
            <Text style={s.h1}>Lab 06 · Navigation</Text>
            {EXERCISES.map((e) => (
              <Pressable key={e.id} style={s.item} onPress={() => setCurrent(e.id)}>
                <Text style={s.itemText}>{e.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  bar: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.bg },
  barText: { color: colors.red, fontWeight: "700" },
  menu: { flex: 1, padding: 24, gap: 12, justifyContent: "center" },
  h1: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: colors.text },
  item: { padding: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.bg },
  itemText: { fontSize: 16, color: colors.text },
});
