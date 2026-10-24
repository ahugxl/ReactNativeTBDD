import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - "); 

  return (
    <SafeAreaView style={styles.root} edges={["bottom"]}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
        
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.priceText}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>

       
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.popTo("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.grey },
  header: { flexDirection: "row", backgroundColor: "#fff", padding: 8, gap: 12, minHeight: 100 },
  thumb: { width: 70, height: 84 },
  headerText: { flex: 1, gap: 4, justifyContent: "flex-start", paddingTop: 4 },
  small: { fontSize: 13, color: colors.text },
  bold: { fontWeight: "700" },
  priceText: { fontSize: 15, fontWeight: "700", color: colors.text },
  body: { flex: 1, backgroundColor: colors.grey, padding: 12 },
  hint: { fontSize: 15, color: colors.text, marginBottom: 8 },
  swatches: { flex: 1, alignItems: "center", justifyContent: "space-evenly" },
  swatch: { width: 80, height: 80 },
  swatchOn: { borderWidth: 3, borderColor: colors.navy },
  doneBtn: {
    height: 44, backgroundColor: colors.blue, borderRadius: 4, borderWidth: 1, borderColor: colors.red,
    alignItems: "center", justifyContent: "center",
  },
  doneText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
