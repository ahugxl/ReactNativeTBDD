import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={s.row} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.img} resizeMode="contain" />
      <View style={s.text}>
        <Text style={s.name} numberOfLines={2}>{phone.name.split(" - ")[0]}</Text>
        <Stars value={phone.rating} size={13} />
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  img: { width: 56, height: 80 },
  text: { flex: 1, justifyContent: "center", gap: 4 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontSize: 15, fontWeight: "700", color: colors.red },
});
