import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // TODO 1: đẩy lên store sau khi dừng bấm 300ms
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
  }, [debouncedQty]);

  // TODO 2: đồng bộ khi store đổi từ nơi khác
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.stock}>Còn {item.stock}</Text>

        {/* nút − số lượng + */}
        <View style={styles.qtyRow}>
          <Pressable
            style={[styles.qtyBtn, !canDec && styles.qtyBtnDisabled]}
            onPress={() => setQty((q) => q - 1)}
            disabled={!canDec}
            accessibilityLabel="Giảm"
          >
            <Text
              style={[styles.qtyBtnText, !canDec && styles.qtyBtnTextDisabled]}
            >
              −
            </Text>
          </Pressable>

          <Text style={styles.qtyNum}>{qty}</Text>

          <Pressable
            style={[styles.qtyBtn, !canInc && styles.qtyBtnDisabled]}
            onPress={() => setQty((q) => q + 1)}
            disabled={!canInc}
            accessibilityLabel="Tăng"
          >
            <Text
              style={[styles.qtyBtnText, !canInc && styles.qtyBtnTextDisabled]}
            >
              +
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={() => onRemove(item.bookId)}
        hitSlop={8}
        accessibilityLabel="Xóa khỏi giỏ"
      >
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 5,
    gap: 10,
  },
  cover: {
    width: 54,
    height: 72,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 4 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  stock: { fontSize: 12, color: colors.muted },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 2 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnDisabled: { borderColor: colors.line },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.indigo,
    lineHeight: 22,
  },
  qtyBtnTextDisabled: { color: colors.line },
  qtyNum: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.navy,
    minWidth: 24,
    textAlign: "center",
  },
  trash: { fontSize: 22 },
});
