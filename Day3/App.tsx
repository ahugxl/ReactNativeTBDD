import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    // screen: flex:1 -> vừa là containing block cho FloatingCartButton (absolute)
    // ở dưới, vừa đảm bảo toàn màn hình được chiếm hết (không có phần trống).
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — nằm NGOÀI ScrollView, cùng cấp với nó,
          nên khi cuộn nội dung bên dưới, Header luôn đứng yên không trôi theo. */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — paddingBottom đủ lớn (100) để
          FloatingCartButton (cao 56 + bottom 24) không che mất cuốn sách cuối. */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log('Mở sách', id)} />
      </ScrollView>

      {/* 3. Nút giỏ hàng nổi — NGOÀI ScrollView, cùng cấp với Header/ScrollView,
          nên luôn nổi cố định ở góc màn hình, không bị cuộn trôi theo nội dung. */}
      <FloatingCartButton
        count={cartCount}
        onPress={() => setCartCount((n) => n + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    marginTop: 4,
  },
});
