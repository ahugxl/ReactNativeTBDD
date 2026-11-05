import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TodoBox } from "../components/TodoBox";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";

import { EmptyState } from "../components/EmptyState";
import { useAuth, useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice, radius } from "../theme";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { isLoggedIn } = useAuth();
  const { items, totalPrice, setQty, remove } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const COUPONS: Record<string, (total: number) => number> = {
    SALE10: (t) => Math.round(t * 0.1),
    GIAM50K: () => 50000,
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const fn = COUPONS[code];
    if (!fn) {
      setCouponError("Mã giảm giá không hợp lệ");
      setDiscount(0);
      return;
    }
    setCouponError(null);
    setDiscount(fn(totalPrice));
  };

  const finalTotal = Math.max(0, totalPrice - discount);
  // TODO BT8.7a: xóa sản phẩm có XÁC NHẬN — dùng confirmDialog(title, message, onConfirm) đã viết sẵn ở utils/dialog.ts
  //   (Alert.alert không chạy trên web nên đã bọc sẵn). Hiện tại xóa ngay không hỏi.
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog(
      "Xóa sản phẩm",
      `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`,
      () => remove(bookId),
    );
  };

  // TODO BT8.4: bảo vệ Checkout — nếu isLoggedIn → navigate("Checkout", { total: finalTotal })
  //   chưa đăng nhập → navigate("Login", { redirectTo: "Checkout", total: finalTotal })
  const goCheckout = () => {
    if (isLoggedIn) navigation.navigate("Checkout", { total: finalTotal });
    else
      navigation.navigate("Login", {
        redirectTo: "Checkout",
        total: finalTotal,
      });
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => (
          <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />
        )}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          {/* ô nhập mã giảm giá */}
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={coupon}
              onChangeText={(t) => {
                setCoupon(t);
                setCouponError(null);
              }}
              placeholder="Nhập mã giảm giá"
              autoCapitalize="characters"
            />
            <Pressable style={styles.couponBtn} onPress={applyCoupon}>
              <Text style={styles.couponBtnText}>Áp dụng</Text>
            </Pressable>
          </View>
          {couponError ? (
            <Text style={styles.couponError}>{couponError}</Text>
          ) : null}
          {discount > 0 && (
            <View style={styles.line}>
              <Text style={styles.label}>Tạm tính</Text>
              <Text style={styles.value}>{formatPrice(totalPrice)}</Text>
            </View>
          )}
          {discount > 0 && (
            <View style={styles.line}>
              <Text style={[styles.label, { color: colors.heart }]}>
                Giảm giá
              </Text>
              <Text style={[styles.value, { color: colors.heart }]}>
                − {formatPrice(discount)}
              </Text>
            </View>
          )}
          <View style={styles.line}>
            <Text style={styles.muted}>Tạm tính</Text>
            <Text style={styles.value}>{formatPrice(totalPrice)}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.total}>Tổng cộng</Text>
            <Text style={styles.total}>{formatPrice(finalTotal)}</Text>
          </View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: {
    backgroundColor: "#fff",
    padding: 14,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  couponRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    color: colors.text,
  },
  couponBtn: {
    backgroundColor: colors.indigo,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  couponBtnText: { color: "#fff", fontWeight: "700" },
  couponError: { color: colors.danger, fontSize: 12 },
  label: { color: colors.text },
});
