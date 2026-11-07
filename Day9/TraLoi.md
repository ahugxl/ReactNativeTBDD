# Câu 1. Giá trị dẫn xuất — tại sao không dùng useState cho errors và valid

errors phụ thuộc hoàn toàn vào name, phone, address vốn đã là state. Mỗi lần render, React tính lại errors từ 3 giá trị hiện tại nên luôn chính xác.
Nếu dùng useState cho errors: phải gọi setErrors(...) ở mọi chỗ có setName, setPhone, setAddress. Quên một chỗ là lỗi hiện sai hoặc nút mở/tắt không đúng lúc.
Ví dụ lỗi cụ thể khi dùng useState: người dùng gõ địa chỉ hợp lệ → setAddress(...) chạy → nhưng quên setErrors(...) → errors.address vẫn là lỗi cũ → nút vẫn mờ dù form đã đủ.
Quy tắc: nếu một giá trị có thể tính được từ state khác thì không cần useState riêng — tính thẳng mỗi lần render.

# Câu 2. Thứ tự gọi — clear() phải sau await createOrder

Nếu clear() chạy trước await createOrder(...): giỏ đã bị xóa trong store và AsyncStorage. Lúc này nếu mất mạng thì createOrder ném lỗi, nhưng giỏ đã mất — người dùng mất toàn bộ hàng đã chọn mà không có đơn hàng nào được tạo.
Đặt clear() ngay sau await createOrder: chỉ khi server xác nhận đã nhận đơn thì mới xóa giỏ. Mất mạng → catch chạy → giỏ còn nguyên → người dùng bấm lại được.
Nguyên tắc chung: thao tác không thể hoàn tác (xóa dữ liệu) chỉ được chạy sau khi hành động quan trọng đã thành công.

# Câu 3. PUT hay PATCH

PUT /users/1 với { name, phone }: json-server thay thế toàn bộ object, user chỉ còn { id, name, phone }. Mất email, password và mọi trường khác.
PATCH /users/1 với { name, phone }: chỉ cập nhật 2 trường được gửi, các trường còn lại giữ nguyên. password vẫn còn trong db.
Dùng PUT khi muốn thay toàn bộ resource (ví dụ: thay cả object cấu hình). Dùng PATCH khi chỉ sửa một phần — đây là trường hợp form chỉnh sửa hồ sơ, nên PATCH là đúng.
Thêm: hàm updateProfile còn destructure bỏ password trước khi trả về, nên Redux store không bao giờ chứa mật khẩu dù server vô tình trả về.

# Câu 4. Cập nhật lạc quan

Nếu bỏ đoạn hoàn lại read: false trong catch: bấm thông báo chưa đọc → giao diện đổi sang đã đọc ngay. Mất mạng → API thất bại nhưng giao diện vẫn hiện “đã đọc”. Mở lại màn → load lại từ server → thông báo quay về “chưa đọc”. Người dùng bối rối vì vừa thấy đã đọc, giờ lại chưa đọc.
Nên dùng cập nhật lạc quan cho: thao tác nhẹ, ít sai, dễ hoàn lại — ví dụ đánh dấu đã đọc, thả tim ♡/♥, like bài viết.
Không nên dùng cho thanh toán: thanh toán phải chắc chắn server đã nhận đơn trước khi báo thành công. Nếu cập nhật lạc quan (xóa giỏ trước khi API xác nhận) thì mất mạng sẽ làm mất giỏ hàng mà không có đơn — đây chính là lý do câu 2 đặt clear() sau await createOrder.

# Câu 5. Lọc trạng thái ở màn Đơn hàng

Thêm vào src/screens/OrdersScreen.tsx:
tsx
// thêm import kiểu
import { OrderStatus } from "../types";

// state lọc — đặt cạnh useState khác
const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

// dữ liệu truyền cho FlatList — thay dòng data={orders}
const filteredOrders = statusFilter === "all"
? orders
: orders.filter((o) => o.status === statusFilter);

Thêm hàng nút lọc trên FlatList:
tsx
<View style={styles.filterRow}>
{(["all", "pending", "shipping", "completed", "cancelled"] as const).map((s) => (
<Pressable
key={s}
style={[styles.filterBtn, statusFilter === s && styles.filterBtnActive]}
onPress={() => setStatusFilter(s)} >
<Text style={[styles.filterText, statusFilter === s && styles.filterTextActive]}>
{s === "all" ? "Tất cả" : s === "pending" ? "Chờ xác nhận"
: s === "shipping" ? "Đang giao" : s === "completed" ? "Hoàn tất" : "Đã huỷ"}
</Text>
</Pressable>
))}
</View>
<FlatList
data={filteredOrders} {/_ ← đổi từ orders thành filteredOrders _/}
...
/>
Style thêm vào:
tsx
filterRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, padding: 12, paddingBottom: 0 },
filterBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: "#fff" },
filterBtnActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
filterText: { fontSize: 12, color: colors.text },
filterTextActive: { color: "#fff", fontWeight: "700" },
