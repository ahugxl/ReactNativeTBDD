import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;                         
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {                                       
    return <View style={s.center}><Text>Không tìm thấy sản phẩm #{id}</Text></View>;
  }
  const saved = has(phone.id);
  return (
    <ScrollView contentContainerStyle={s.root}>
   
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={s.image} resizeMode="contain" />
      <Text style={s.name}>{phone.name}</Text>
      <View style={s.row}>
        <Stars value={phone.rating} />
        <Text style={s.muted}>(Xem {phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.muted}>Cung cấp bởi <Text style={s.bold}>{phone.supplier}</Text></Text>

     
      <Pressable style={[s.btn, saved && s.btnOn]} onPress={() => toggle(phone.id)}>
        <Text style={[s.btnText, saved && { color: "#fff" }]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { padding: 16, gap: 10, backgroundColor: "#fff", flexGrow: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 320 },
  name: { fontSize: 18, fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  muted: { color: colors.muted },
  bold: { fontWeight: "700", color: colors.text },
  price: { fontSize: 22, fontWeight: "700", color: colors.red },
  btn: { marginTop: 8, height: 48, borderRadius: 6, borderWidth: 1, borderColor: colors.red, alignItems: "center", justifyContent: "center" },
  btnOn: { backgroundColor: colors.red },
  btnText: { color: colors.red, fontWeight: "700", fontSize: 16 },
});
