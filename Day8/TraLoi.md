# Câu 1. Cờ ready trong useAutoPersist

Giải thích theo thứ tự các lần render:
Render đầu tiên: Redux store còn rỗng (cartItems = []), usePersistence chưa đọc xong AsyncStorage, ready = false.
Nếu không có if (ready) return: useAutoPersist chạy ngay, saveJSON ghi mảng rỗng [] vào @bookstore/cart, xóa mất dữ liệu cũ.
Render tiếp theo: usePersistence đọc xong, dispatch(hydrateCart(cart)), giỏ có hàng. Nhưng lúc này dữ liệu trong AsyncStorage đã bị ghi đè bởi [] ở bước trên rồi.
Kết quả: mở lại app lần sau thì giỏ trống dù người dùng chưa xóa gì.

# Câu 2. Token giả và bảo mật

Hai điểm không an toàn:
App tự so mật khẩu ở client: ai đó đọc được code (hoặc decompile app) thì biết logic so sánh, có thể bỏ qua bước kiểm tra.
Token được tự tạo ở client, không có chữ ký từ server: app khác có thể giả mạo token hợp lệ mà server không phát hiện được.
Hệ thống thật: server nhận email + mật khẩu, so với hash trong database, trả về JWT có chữ ký bí mật. Client không bao giờ thấy mật khẩu gốc hay logic kiểm tra.
Token nên lưu ở đâu: SecureStore (Expo) thay vì AsyncStorage, vì SecureStore mã hóa dữ liệu trên thiết bị. AsyncStorage lưu dạng plain text, ai có quyền truy cập file system của thiết bị đều đọc được.

# Câu 3. Hai effect trong CartItemRow

Thử xóa effect đồng bộ setQty(item.quantity):
Tình huống bị lệch: người dùng mở 2 thiết bị cùng tài khoản, hoặc màn BookDetailScreen gọi add() thêm sách đã có trong giỏ. Lúc đó item.quantity trong store tăng lên, nhưng qty cục bộ trong CartItemRow vẫn giữ giá trị cũ. Màn hình hiện số sai so với store.
Tình huống cụ thể dễ thấy nhất: vào Chi tiết một cuốn đang có số lượng 2 trong giỏ, bấm “Thêm vào giỏ” thêm 1 lần nữa. Store thành 3, nhưng CartItemRow vẫn hiện 2 vì không có effect đồng bộ.

# Câu 4. Một nguồn state cho HeartButton

Nếu dùng useState riêng ở mỗi nơi:
BookCard ở lưới có useState(false) riêng.
BookDetailScreen có useState(false) riêng.
Bấm tim ở lưới → state của BookCard đổi thành true, nhưng state của BookDetailScreen vẫn là false. Mở trang chi tiết thì tim đang tắt, dù vừa thả ở lưới.
Store giải quyết bằng cách: cả hai nơi đều gọi useWishlist() đọc từ cùng một store.wishlist.ids. Bấm tim ở bất kỳ đâu → toggle(bookId) → Redux cập nhật ids → tất cả component đang đọc isFavorite(bookId) đều re-render với giá trị mới. Không cần truyền props hay đồng bộ thủ công.

# Câu 5. Thêm hiện/ẩn mật khẩu

Làm thêm vào src/screens/LoginScreen.tsx:
Thêm state:
tsx
const [showPassword, setShowPassword] = useState(false);
Thay FormField mật khẩu bằng cách bọc thêm nút 👁. Vì FormField không có slot cho icon, cách đơn giản nhất là thêm View bọc ngoài:
tsx
<View>
<FormField
    label="Mật khẩu"
    value={password}
    onChangeText={setPassword}
    error={errors.password}
    secureTextEntry={!showPassword}
  />
<Pressable
onPress={() => setShowPassword((v) => !v)}
accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}

>

    <Text>{showPassword ? "🙈" : "👁"}</Text>

  </Pressable>
</View>
