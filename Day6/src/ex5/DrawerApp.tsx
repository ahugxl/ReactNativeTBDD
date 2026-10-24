import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

interface SettingsCtx { notify: boolean; setNotify: (v: boolean) => void; dark: boolean; setDark: (v: boolean) => void }
const SettingsContext = createContext<SettingsCtx | null>(null);
function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsContext.Provider");
  return ctx;
}
const useScreenColors = () => {
  const { dark } = useSettings();
  return { bg: dark ? "#121212" : "#fff", text: dark ? "#F2F2F2" : colors.text, muted: dark ? "#A0A0A0" : colors.muted };
};

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

function HomeScreen() {
  const c = useScreenColors();
  return (
    <View style={[s.center, { backgroundColor: c.bg }]}>
      <Text style={[s.big, { color: c.text }]}>Xin chào</Text>
    </View>
  );
}

function ProfileScreen() {
  const c = useScreenColors();
  return (
    <View style={[s.center, { backgroundColor: c.bg }]}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={[s.big, { color: c.text }]}>Nguyen Huu Thinh</Text>
      <Text style={{ color: c.muted }}>thinh.nguyen@gmal.com</Text>
    </View>
  );
}


function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const c = useScreenColors();
  return (
    <View style={[s.settings, { backgroundColor: c.bg }]}>
      <View style={s.row}>
        <Text style={[s.label, { color: c.text }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} trackColor={{ true: colors.red }} />
      </View>
      <View style={s.row}>
        <Text style={[s.label, { color: c.text }]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} trackColor={{ true: colors.red }} />
      </View>
      <Text style={[s.status, { color: c.muted }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}


export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  return (
    <SettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  big: { fontSize: 24, fontWeight: "700" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.red, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "700" },
  settings: { flex: 1, padding: 20, gap: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 17 },
  status: { marginTop: 12, fontSize: 15 },
});
