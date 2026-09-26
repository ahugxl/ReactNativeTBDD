// Project GHÉP — Giờ 4 (HomeScreen + BookDetailScreen) + Giờ 5 (TabBar + CartScreen)
// Tab "Trang chủ" giờ dùng đúng nội dung thật của gio4 (trước đây chỉ là placeholder
// ghi chú "xem project bookstore-online-gio4"), 2 tab còn lại (Danh mục, Tài khoản)
// vẫn để placeholder vì thuộc phạm vi Giờ 2 / không được đề bài mô tả.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { ScrollView } from "react-native";
import { Platform, StatusBar as RNStatusBar } from 'react-native';
export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Đổi tab -> luôn thoát khỏi màn Chi tiết sách (nếu đang mở) để không bị
  // "kẹt" ở Chi tiết khi quay lại tab Trang chủ lần sau.
  function handleChangeTab(tab: TabKey) {
    setActiveTab(tab);
    setSelectedBookId(null);
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar (position:'absolute') bên dưới */}
      <View style={styles.body}>
        <Header/>
        {activeTab === 'home' ? (
          selectedBook ? (
            <BookDetailScreen
              book={selectedBook}
              onBack={() => setSelectedBookId(null)}
              onAddToCart={() => setCartCount((n) => n + 1)}
            />
          ) : (
            <HomeScreen
              cartCount={cartCount}
              onPressBook={(id) => setSelectedBookId(id)}
              onPressCart={() => handleChangeTab('cart')}
            />
          )
        ) : activeTab === 'cart' ? (
          <CartScreen items={CART_ITEMS} />
        ) 
        : activeTab === 'category' ? (
  <CategoryScreen />
)
        : (
          <Placeholder tab={activeTab} />
        )}
        <TabBar active={activeTab} onChange={handleChangeTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Partial<Record<TabKey, string>> = {
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}
function CategoryScreen() {
  return (
    <View style={styles.categoryScreen}>
      <Text style={styles.categoryTitle}>Danh mục</Text>
      <ScrollView contentContainerStyle={styles.categoryScrollContent}>
        <CategoryChips />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
 root: {
  flex: 1,
  backgroundColor: '#FFFFFF',
  paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
},
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
  categoryScreen: { flex: 1, backgroundColor: '#FFFFFF' },
categoryTitle: {
  fontSize: 18,
  fontWeight: '800',
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 8,
},
categoryScrollContent: {
  paddingHorizontal: 16,
  paddingBottom: 16 + 64, // 64 = chiều cao TabBar, tránh bị che ở cuối
},
});
