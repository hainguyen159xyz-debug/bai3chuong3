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

// Lấy ô input tìm kiếm có id="search-input"
const searchInput = document.querySelector("#search-input");

// Lấy thẻ select bộ lọc danh mục có id="category-filter"
const categoryFilter = document.querySelector("#category-filter");

// Mảng cart lưu danh sách sản phẩm người dùng đã thêm vào giỏ
// Dùng let vì giỏ hàng sẽ thay đổi trong quá trình sử dụng
let cart = [];

// Biến products dùng để lưu dữ liệu sau khi fetch xong
// Khai báo ở ngoài để các hàm bên dưới có thể dùng được
let products = [];


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

                <!-- Ảnh sản phẩm -->
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <!-- Nội dung card -->
                <div class="card-body">

                    <!-- Badge nổi bật + tình trạng -->
                    <div class="card-badges">
                        ${product.featured
                            ? '<span class="badge-featured">Nổi bật</span>'
                            : ''}
                        <span class="badge-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
                            ${product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                        </span>
                    </div>

                    <!-- Tên sản phẩm -->
                    <h3 class="card-name">${product.name}</h3>

                    <!-- Mô tả ngắn -->
                    <p class="card-description">${product.description}</p>

                    <!-- Giá -->
                    <p class="card-price">
                        ${product.price.toLocaleString("vi-VN")} đ
                        <span class="card-unit">/ ${product.unit}</span>
                    </p>

                </div>

                <!-- 2 nút ở cuối card -->
                <div class="card-actions">
                    <button class="btn-detail" data-id="${product.id}">
                        Chi tiết
                    </button>
                    <button
                        class="btn-add-cart"
                        data-id="${product.id}"
                        ${product.stock === 0 ? "disabled" : ""}
                    >
                        ${product.stock > 0 ? "Thêm vào giỏ" : "Hết hàng"}
                    </button>
                </div>

            </article>
        `;

    }).join("");

}


// ===============================
// 3. HÀM LỌC SẢN PHẨM
// ===============================

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
// 4. SỰ KIỆN TÌM KIẾM VÀ LỌC
// ===============================

// Lắng nghe sự kiện "input" — kích hoạt mỗi khi người dùng gõ hoặc xóa ký tự
// Khác với "change" chỉ kích hoạt khi mất focus
searchInput.addEventListener("input", function () {
    filterProducts();
});

// Lắng nghe sự kiện "change" — kích hoạt khi người dùng chọn một option khác
categoryFilter.addEventListener("change", function () {
    filterProducts();
});


// ===============================
// 5. MODAL CHI TIẾT SẢN PHẨM
// ===============================

const detailModal     = document.querySelector("#detail-modal");
const closeDetailBtn  = document.querySelector("#close-detail");
const detailAddCart   = document.querySelector("#detail-add-cart");

// Đóng modal chi tiết khi click ✕
closeDetailBtn.addEventListener("click", function () {
    detailModal.classList.add("hidden");
});

// Đóng modal chi tiết khi click vùng tối ngoài
detailModal.addEventListener("click", function (event) {
    if (event.target === detailModal) {
        detailModal.classList.add("hidden");
    }
});

// Hàm mở modal và điền thông tin sản phẩm vào
function openDetailModal(product) {

    // Điền dữ liệu từ object product vào các phần tử trong modal
    document.querySelector("#detail-name").textContent        = product.name;
    document.querySelector("#detail-image").src               = product.image;
    document.querySelector("#detail-image").alt               = product.name;
    document.querySelector("#detail-category").textContent    = product.category;
    document.querySelector("#detail-origin").textContent      = product.origin;
    document.querySelector("#detail-unit").textContent        = product.unit;
    document.querySelector("#detail-price").textContent       = product.price.toLocaleString("vi-VN") + " đ";
    document.querySelector("#detail-stock").textContent       = product.stock > 0 ? "Còn hàng" : "Hết hàng";
    document.querySelector("#detail-description").textContent = product.description;
    document.querySelector("#detail-featured").textContent    = product.featured ? "⭐ Sản phẩm nổi bật" : "";

    // Cập nhật nút thêm giỏ trong modal chi tiết
    if (product.stock > 0) {
        detailAddCart.textContent       = "Thêm vào giỏ hàng";
        detailAddCart.disabled          = false;
        detailAddCart.dataset.id        = product.id; // Lưu id để dùng khi click
    } else {
        detailAddCart.textContent       = "Hết hàng";
        detailAddCart.disabled          = true;
    }

    // Hiện modal
    detailModal.classList.remove("hidden");
}

// Nút "Thêm vào giỏ hàng" trong modal chi tiết
detailAddCart.addEventListener("click", function () {

    const productId = Number(detailAddCart.dataset.id);

    const product = products.find(function (item) {
        return item.id === productId;
    });

    cart.push(product);
    updateCartCount();

    // Đóng modal chi tiết sau khi thêm
    detailModal.classList.add("hidden");
});


// ===============================
// 6. GIỎ HÀNG
// ===============================

// Lấy các phần tử liên quan đến modal giỏ hàng
const cartBtn       = document.querySelector("#cart-btn");
const cartModal     = document.querySelector("#cart-modal");
const closeCartBtn  = document.querySelector("#close-cart");
const cartItemsDiv  = document.querySelector("#cart-items");
const cartTotalEl   = document.querySelector("#cart-total-price");
const clearCartBtn  = document.querySelector("#clear-cart");
const checkoutBtn   = document.querySelector("#checkout-btn");

// Mở modal khi click vào icon giỏ hàng ở header
cartBtn.addEventListener("click", function () {
    renderCart();                        // Cập nhật nội dung giỏ trước khi hiện
    cartModal.classList.remove("hidden"); // Bỏ class hidden để hiện modal
});

// Đóng modal khi click nút ✕
closeCartBtn.addEventListener("click", function () {
    cartModal.classList.add("hidden");
});

// Đóng modal khi click vào vùng tối bên ngoài
cartModal.addEventListener("click", function (event) {
    // Chỉ đóng nếu click đúng vào lớp nền (không phải nội dung bên trong)
    if (event.target === cartModal) {
        cartModal.classList.add("hidden");
    }
});

// Xóa toàn bộ giỏ hàng
clearCartBtn.addEventListener("click", function () {
    cart = [];               // Reset mảng về rỗng
    updateCartCount();       // Cập nhật số trên header
    renderCart();            // Cập nhật lại giao diện modal
});

// Nút thanh toán: đóng modal giỏ hàng, mở modal form đặt hàng
checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.");
        return;
    }

    // Đóng modal giỏ hàng
    cartModal.classList.add("hidden");

    // Mở modal form đặt hàng
    document.querySelector("#order-modal").classList.remove("hidden");

    // Focus vào ô họ tên để người dùng điền ngay
    document.querySelector("#customer-name").focus();
});

// Hàm renderCart: vẽ danh sách sản phẩm và tổng tiền vào modal
function renderCart() {

    // Nếu giỏ trống thì hiện thông báo
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <p class="cart-empty">Giỏ hàng đang trống.</p>
        `;
        cartTotalEl.textContent = "0 đ";
        return;
    }

    // Gom các sản phẩm trùng nhau lại thành từng nhóm
    const grouped = {};

    cart.forEach(function (product) {
        if (grouped[product.id]) {
            grouped[product.id].qty += 1;
        } else {
            grouped[product.id] = { ...product, qty: 1 };
        }
    });

    const groupedArray = Object.values(grouped);

    // Tạo HTML — mỗi dòng có nút −, số lượng, nút +, thành tiền, nút xóa
    cartItemsDiv.innerHTML = groupedArray.map(function (item) {
        return `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">
                        ${item.price.toLocaleString("vi-VN")} đ / ${item.unit}
                    </p>
                </div>

                <!-- Bộ điều chỉnh số lượng -->
                <div class="qty-control">
                    <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                </div>

                <!-- Thành tiền -->
                <p class="cart-item-subtotal">
                    ${(item.price * item.qty).toLocaleString("vi-VN")} đ
                </p>

                <!-- Nút xóa -->
                <button class="remove-item" data-id="${item.id}">✕</button>

            </div>
        `;
    }).join("");

    // Tính tổng tiền
    const total = groupedArray.reduce(function (sum, item) {
        return sum + item.price * item.qty;
    }, 0);

    cartTotalEl.textContent = total.toLocaleString("vi-VN") + " đ";

    // Sự kiện nút − (giảm 1): nếu về 0 thì xóa hẳn khỏi giỏ
    cartItemsDiv.querySelectorAll(".qty-minus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = Number(btn.dataset.id);
            const index = cart.findIndex(function (p) { return p.id === id; });
            if (index !== -1) {
                cart.splice(index, 1); // Xóa 1 phần tử tại vị trí tìm được
            }
            updateCartCount();
            renderCart();
        });
    });

    // Sự kiện nút + (tăng 1): thêm thêm 1 bản sao sản phẩm vào mảng cart
    cartItemsDiv.querySelectorAll(".qty-plus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = Number(btn.dataset.id);
            const product = products.find(function (p) { return p.id === id; });
            if (product) {
                cart.push(product);
            }
            updateCartCount();
            renderCart();
        });
    });

    // Sự kiện nút ✕ (xóa toàn bộ dòng sản phẩm đó)
    cartItemsDiv.querySelectorAll(".remove-item").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const id = Number(btn.dataset.id);
            // Lọc ra tất cả sản phẩm KHÔNG có id này → xóa toàn bộ dòng
            cart = cart.filter(function (p) { return p.id !== id; });
            updateCartCount();
            renderCart();
        });
    });
}

// Dùng event delegation: thay vì gắn sự kiện cho từng nút,
// ta gắn một sự kiện click cho thẻ cha (#product-list)
productList.addEventListener("click", function (event) {

    const btn = event.target.closest("button");
    if (!btn) return; // Không phải nút thì bỏ qua

    const productId = Number(btn.dataset.id);

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) return;

    // Nút "Chi tiết" — mở modal chi tiết sản phẩm
    if (btn.classList.contains("btn-detail")) {
        openDetailModal(product);
    }

    // Nút "Thêm vào giỏ" — thêm vào mảng cart
    if (btn.classList.contains("btn-add-cart")) {
        cart.push(product);
        updateCartCount();
    }

});

// Hàm này cập nhật con số hiển thị cạnh icon giỏ hàng ở header
// cart.length là số sản phẩm hiện có trong giỏ
function updateCartCount() {
    document.querySelector("#cart-count").textContent = cart.length;
}


// ===============================
// 7. KIỂM TRA FORM ĐẶT HÀNG
// ===============================

const orderModal   = document.querySelector("#order-modal");
const closeOrderBtn = document.querySelector("#close-order");
const orderForm    = document.querySelector("#order-form");

// Đóng modal form khi click ✕
closeOrderBtn.addEventListener("click", function () {
    orderModal.classList.add("hidden");
});

// Đóng modal form khi click vùng tối ngoài
orderModal.addEventListener("click", function (event) {
    if (event.target === orderModal) {
        orderModal.classList.add("hidden");
    }
});

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const customerName = document.querySelector("#customer-name").value.trim();
    const phone        = document.querySelector("#phone").value.trim();
    const address      = document.querySelector("#address").value.trim();

    if (customerName.length < 3) {
        alert("Họ tên phải có ít nhất 3 ký tự.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Số điện thoại phải gồm đúng 10 chữ số.");
        return;
    }

    if (address.length < 10) {
        alert("Địa chỉ phải có ít nhất 10 ký tự.");
        return;
    }

    if (cart.length === 0) {
        alert("Giỏ hàng chưa có sản phẩm.");
        return;
    }

    alert("Đơn hàng của " + customerName + " đã được ghi nhận thành công!");

    // Xóa form và giỏ hàng sau khi đặt thành công
    orderForm.reset();
    cart = [];
    updateCartCount();

    // Đóng modal form
    orderModal.classList.add("hidden");
});


// ===============================
// 8. NAV MENU — ACTIVE LINK
// ===============================

// Khi click vào một nav-link, bỏ class active của link cũ
// và gán cho link vừa click
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        document.querySelectorAll(".nav-link").forEach(function (l) {
            l.classList.remove("active");
        });
        link.classList.add("active");
    });
});


// ===============================
// 9. FETCH DỮ LIỆU TỪ products.json
// ===============================

// fetch() gửi yêu cầu đọc file products.json
// Đây là thao tác bất đồng bộ (async) nên dùng .then() để xử lý kết quả
// Phải chạy qua server (Live Server) mới dùng được fetch với file local
fetch("products.json")

    // Bước 1: response là kết quả trả về từ fetch
    // .json() chuyển nội dung file JSON thành mảng JavaScript
    // Trả về một Promise nên tiếp tục dùng .then()
    .then(function (response) {
        return response.json();
    })

    // Bước 2: data là mảng sản phẩm đã được chuyển đổi
    // Gán vào biến products để các hàm khác có thể dùng
    // Rồi gọi renderProducts để hiển thị lần đầu khi trang mở
    .then(function (data) {

        // Lưu dữ liệu vào biến products (đã khai báo ở trên)
        products = data;

        // Hiển thị toàn bộ sản phẩm lên trang
        renderProducts(products);
    })

    // Bước 3: Nếu có lỗi (file không tồn tại, JSON sai cú pháp...)
    // .catch() sẽ bắt lỗi và hiển thị thông báo thay vì crash trang
    .catch(function (error) {
        productList.innerHTML = `
            <p class="no-product">
                Không thể tải dữ liệu sản phẩm. Vui lòng thử lại.
            </p>
        `;
        console.error("Lỗi khi fetch products.json:", error);
    });
