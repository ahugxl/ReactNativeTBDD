import React, { useCallback, useEffect, useState } from "react";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { OrderStatus } from "../types";
const PAYMENT_LABEL: Record<string, string> = {
  cod: "Thanh toán khi nhận hàng",
  bank: "Chuyển khoản ngân hàng",
};

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { add, setQty, items: cartItems } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders(
        [...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      );
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  const reorder = async (order: Order) => {
    try {
      const books = await getBooks();
      order.items.forEach((it) => {
        const book = books.find((b) => b.id === it.bookId);
        if (!book) return;
        const inCart = cartItems.find((c) => c.bookId === it.bookId);
        if (!inCart) {
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          });
        }
        setQty(it.bookId, (inCart?.quantity ?? 0) + it.quantity);
      });
      showMessage(
        "Đã thêm vào giỏ",
        "Các sản phẩm của đơn hàng đã được thêm lại vào giỏ.",
        () => navigation.navigate("Tabs", { screen: "Cart" }),
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (!isLoggedIn) {
    return (
      <EmptyState
        emoji="🔒"
        title="Bạn cần đăng nhập"
        actionLabel="Đăng nhập"
        onAction={() => navigation.navigate("Login")}
      />
    );
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  void StatusBadge;
  void PrimaryButton;
  void formatDateTime;
  void formatPrice;
  void radius;
  void colors;
  void reorder;
  void setOpenId;
  void openId;
  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {(
          ["all", "pending", "shipping", "completed", "cancelled"] as const
        ).map((s) => (
          <Pressable
            key={s}
            style={[
              styles.filterBtn,
              statusFilter === s && styles.filterBtnActive,
            ]}
            onPress={() => setStatusFilter(s)}
          >
            <Text
              style={[
                styles.filterText,
                statusFilter === s && styles.filterTextActive,
              ]}
            >
              {s === "all"
                ? "Tất cả"
                : s === "pending"
                  ? "Chờ xác nhận"
                  : s === "shipping"
                    ? "Đang giao"
                    : s === "completed"
                      ? "Hoàn tất"
                      : "Đã huỷ"}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🧾"
            title="Bạn chưa có đơn hàng nào"
            message="Đặt đơn đầu tiên để theo dõi tại đây."
            actionLabel="Mua sắm ngay"
            onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
          />
        }
        renderItem={({ item: o }) => {
          const open = openId === o.id;
          return (
            <View style={styles.card}>
              <Pressable
                onPress={() => setOpenId(open ? null : o.id)}
                style={styles.head}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.code}>Đơn #{o.id}</Text>
                  <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                  <Text style={styles.total}>{formatPrice(o.total)}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <StatusBadge status={o.status} />
                  <Text style={styles.toggle}>
                    {open ? "Thu gọn ▲" : "Chi tiết ▼"}
                  </Text>
                </View>
              </Pressable>

              {open && (
                <View style={styles.detail}>
                  {o.items.map((it) => (
                    <View key={it.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {it.title} × {it.quantity}
                      </Text>
                      <Text style={styles.itemPrice}>
                        {formatPrice(it.price * it.quantity)}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.addr}>
                    <Text style={styles.addrH}>Giao đến</Text>
                    <Text style={styles.addrT}>
                      {o.address.name} · {o.address.phone}
                    </Text>
                    <Text style={styles.addrT}>{o.address.address}</Text>
                    <Text style={styles.addrT}>
                      Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}
                    </Text>
                  </View>
                  {o.status === "completed" && (
                    <PrimaryButton
                      title="🔄 Mua lại"
                      variant="outline"
                      onPress={() => reorder(o)}
                    />
                  )}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 12, gap: 10 },
  card: { backgroundColor: "#fff", borderRadius: 10, overflow: "hidden" },
  head: { flexDirection: "row", padding: 12, gap: 8 },
  code: { fontWeight: "800", color: colors.navy, fontSize: 15 },
  date: { color: colors.muted, fontSize: 13 },
  total: { fontWeight: "700", color: colors.indigo, fontSize: 15 },
  toggle: { color: colors.indigo, fontSize: 13 },
  detail: { borderTopWidth: 1, borderColor: colors.line, padding: 12, gap: 8 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { color: colors.text, fontWeight: "600" },
  addr: { gap: 3, marginTop: 4 },
  addrH: { fontWeight: "700", color: colors.navy },
  addrT: { color: colors.muted, fontSize: 13 },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    padding: 12,
    paddingBottom: 0,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#fff",
  },
  filterBtnActive: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  filterText: { fontSize: 12, color: colors.text },
  filterTextActive: { color: "#fff", fontWeight: "700" },
});
