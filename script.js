// ===============================
// FILE: script.js
// Xử lý toàn bộ logic của trang web:
// hiển thị sản phẩm, tìm kiếm, lọc,
// giỏ hàng và kiểm tra form đặt hàng
// ===============================


// ===============================
// 1. LẤY KHU VỰC HIỂN THỊ SẢN PHẨM
// ===============================

// querySelector tìm phần tử HTML có id="product-list"
// Đây là thẻ <section> nơi các thẻ sản phẩm sẽ được chèn vào
const productList = document.querySelector("#product-list");


// ===============================
// 2. HÀM HIỂN THỊ SẢN PHẨM
// ===============================

// Hàm renderProducts nhận vào một mảng sản phẩm (items)
// rồi tạo HTML và chèn vào trang
function renderProducts(items) {

    // Nếu mảng rỗng (không có sản phẩm nào khớp)
    // thì hiển thị thông báo thay vì để trống
    if (items.length === 0) {
        productList.innerHTML = `
            <p class="no-product">
                Không tìm thấy sản phẩm phù hợp.
            </p>
        `;
        return; // Dừng hàm, không chạy tiếp
    }

    // items.map() duyệt qua từng sản phẩm trong mảng
    // và trả về một chuỗi HTML cho mỗi sản phẩm
    // .join("") ghép tất cả lại thành một chuỗi duy nhất
    // rồi gán vào innerHTML để hiển thị lên trang
    productList.innerHTML = items.map(function (product) {

        return `
            <article class="product-card">

                <!-- Ảnh sản phẩm — src lấy từ thuộc tính image -->
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <!-- Tên sản phẩm -->
                <h3>${product.name}</h3>

                <!-- Danh mục -->
                <p>Danh mục: ${product.category}</p>

                <!-- Xuất xứ -->
                <p>Xuất xứ: ${product.origin}</p>

                <!-- Giá — toLocaleString("vi-VN") định dạng số kiểu Việt Nam
                     ví dụ: 120000 → 120.000 -->
                <p>
                    Giá:
                    ${product.price.toLocaleString("vi-VN")} đ
                </p>

                <!-- Đơn vị tính -->
                <p>Đơn vị: ${product.unit}</p>

                <!-- Mô tả sản phẩm -->
                <p>Mô tả: ${product.description}</p>

                <!-- Tình trạng kho — dùng toán tử 3 ngôi (ternary)
                     stock > 0 thì "Còn hàng", ngược lại "Hết hàng" -->
                <p>
                    Tình trạng:
                    ${product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </p>

                <!-- Hiển thị badge nổi bật nếu featured = true
                     Nếu featured = false thì hiển thị chuỗi rỗng "" -->
                <p>
                    ${product.featured ? "⭐ Sản phẩm nổi bật" : ""}
                </p>

                <!-- Nút thêm vào giỏ hàng
                     data-id lưu id sản phẩm để sau này lấy ra khi click
                     Nếu hết hàng thì thêm thuộc tính disabled (vô hiệu hóa nút) -->
                <button
                    data-id="${product.id}"
                    ${product.stock === 0 ? "disabled" : ""}
                >
                    ${product.stock > 0
                        ? "Thêm vào giỏ hàng"
                        : "Hết hàng"}
                </button>

            </article>
        `;

    }).join("");

}

// Gọi hàm lần đầu khi trang vừa mở
// truyền vào toàn bộ mảng products từ file products.js
renderProducts(products);


// ===============================
// 3. TÌM KIẾM VÀ LỌC SẢN PHẨM
// ===============================

// Lấy ô input tìm kiếm có id="search-input"
const searchInput = document.querySelector("#search-input");

// Lấy thẻ select bộ lọc danh mục có id="category-filter"
const categoryFilter = document.querySelector("#category-filter");


// Hàm filterProducts: lọc sản phẩm theo từ khóa VÀ danh mục
function filterProducts() {

    // Lấy giá trị người dùng đang gõ trong ô tìm kiếm
    // toLowerCase() chuyển về chữ thường để so sánh không phân biệt hoa/thường
    // trim() xóa khoảng trắng thừa ở đầu và cuối
    const keyword = searchInput.value.toLowerCase().trim();

    // Lấy giá trị đang được chọn trong dropdown danh mục
    // ví dụ: "all", "ca-phe", "mat-ong", ...
    const category = categoryFilter.value;

    // Dùng .filter() để lọc mảng products
    // Chỉ giữ lại những sản phẩm thỏa mãn cả 2 điều kiện
    const result = products.filter(function (product) {

        // Kiểm tra tên sản phẩm có chứa từ khóa không
        // .includes() trả về true nếu chuỗi chứa từ khóa
        const matchName = product.name
            .toLowerCase()
            .includes(keyword);

        // Kiểm tra danh mục:
        // Nếu đang chọn "all" thì cho qua tất cả
        // Nếu chọn danh mục cụ thể thì chỉ lấy sản phẩm đúng danh mục đó
        const matchCategory =
            category === "all" ||
            product.category === category;

        // Sản phẩm phải thỏa mãn CẢ HAI điều kiện mới được giữ lại
        return matchName && matchCategory;
    });

    // Gọi renderProducts với danh sách đã lọc để cập nhật giao diện
    renderProducts(result);
}


// ===============================
// 4. SỰ KIỆN TÌM KIẾM
// ===============================

// Lắng nghe sự kiện "input" — kích hoạt mỗi khi người dùng gõ hoặc xóa ký tự
// Khác với "change" chỉ kích hoạt khi mất focus
searchInput.addEventListener("input", function () {

    filterProducts();

});


// ===============================
// 5. SỰ KIỆN LỌC DANH MỤC
// ===============================

// Lắng nghe sự kiện "change" — kích hoạt khi người dùng chọn một option khác
categoryFilter.addEventListener("change", function () {

    filterProducts();

});


// ===============================
// 6. GIỎ HÀNG
// ===============================

// Mảng cart lưu danh sách sản phẩm người dùng đã thêm vào giỏ
// Dùng let vì giỏ hàng sẽ thay đổi trong quá trình sử dụng
let cart = [];

// Dùng event delegation: thay vì gắn sự kiện cho từng nút,
// ta gắn một sự kiện click cho thẻ cha (#product-list)
// Khi click vào nút bên trong, sự kiện "nổi bọt" lên tới productList
productList.addEventListener("click", function (event) {

    // event.target là phần tử người dùng vừa click vào
    // Kiểm tra xem có phải thẻ BUTTON không
    if (event.target.tagName === "BUTTON") {

        // Lấy id sản phẩm từ thuộc tính data-id của nút
        // Number() chuyển chuỗi sang số để so sánh đúng kiểu
        const productId = Number(event.target.dataset.id);

        // Tìm sản phẩm trong mảng products bằng id vừa lấy
        // .find() trả về phần tử đầu tiên thỏa mãn điều kiện
        const product = products.find(function (item) {
            return item.id === productId;
        });

        // Thêm sản phẩm vào mảng giỏ hàng
        cart.push(product);

        // Cập nhật số hiển thị trên icon giỏ hàng
        updateCartCount();

        // Hiển thị thông báo cho người dùng biết đã thêm thành công
        alert(product.name + " đã được thêm vào giỏ hàng!");
    }

});


// ===============================
// 7. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG
// ===============================

// Hàm này cập nhật con số hiển thị cạnh icon giỏ hàng ở header
// cart.length là số sản phẩm hiện có trong giỏ
function updateCartCount() {

    document.querySelector("#cart-count").textContent = cart.length;

}


// ===============================
// 8. KIỂM TRA FORM ĐẶT HÀNG
// ===============================

// Lấy form đặt hàng
const orderForm = document.querySelector("#order-form");

// Lắng nghe sự kiện submit (khi người dùng nhấn nút "Gửi đơn hàng")
orderForm.addEventListener("submit", function (event) {

    // Ngăn trình duyệt reload trang theo hành vi mặc định của form
    event.preventDefault();

    // Lấy giá trị từ các ô input và cắt khoảng trắng thừa
    const customerName = document
        .querySelector("#customer-name")
        .value
        .trim();

    const phone = document
        .querySelector("#phone")
        .value
        .trim();

    const address = document
        .querySelector("#address")
        .value
        .trim();


    // --- Kiểm tra họ tên ---
    // Họ tên phải có ít nhất 3 ký tự
    if (customerName.length < 3) {
        alert("Họ tên phải có ít nhất 3 ký tự.");
        return; // Dừng lại, không xử lý tiếp
    }

    // --- Kiểm tra số điện thoại ---
    // Dùng Regular Expression (regex) để kiểm tra
    // ^[0-9]{10}$ nghĩa là: chuỗi gồm đúng 10 chữ số từ 0-9
    // test() trả về true nếu hợp lệ, false nếu không hợp lệ
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Số điện thoại phải gồm đúng 10 chữ số.");
        return;
    }

    // --- Kiểm tra địa chỉ ---
    // Địa chỉ phải có ít nhất 10 ký tự
    if (address.length < 10) {
        alert("Địa chỉ phải có ít nhất 10 ký tự.");
        return;
    }

    // --- Kiểm tra giỏ hàng ---
    // Không cho đặt hàng nếu giỏ hàng đang trống
    if (cart.length === 0) {
        alert("Giỏ hàng chưa có sản phẩm.");
        return;
    }

    // --- Đặt hàng thành công ---
    // Tất cả điều kiện đã qua, thông báo thành công
    alert(
        "Đơn hàng của " +
        customerName +
        " đã được ghi nhận thành công!"
    );

    // Xóa toàn bộ dữ liệu trong form để người dùng có thể nhập lại
    orderForm.reset();

});
