// ===============================
// 1. DỮ LIỆU SẢN PHẨM
// ===============================

const products = [
    {
        id: 1,
        name: "Cà phê Buôn Ma Thuột",
        category: "ca-phe",
        price: 120000,
        origin: "Đắk Lắk",
        stock: 20,
        image: "images/cà phê bmt.jpg"
    },
    {
        id: 2,
        name: "Mật ong rừng Tây Nguyên",
        category: "mat-ong",
        price: 180000,
        origin: "Gia Lai",
        stock: 10,
        image: "images/mật ong rừng.jpg"
    },
    {
        id: 3,
        name: "Hạt mắc ca Tây Nguyên",
        category: "mac-ca",
        price: 200000,
        origin: "Lâm Đồng",
        stock: 25,
        image: "images/mắc ca.jpg"
    },
    {
        id: 4,
        name: "Hồ tiêu Tây Nguyên",
        category: "tieu",
        price: 100000,
        origin: "Đắk Nông",
        stock: 30,
        image: "images/tiêu.jpg"
    },
    {
        id: 5,
        name: "Bơ sáp Tây Nguyên",
        category: "bo",
        price: 80000,
        origin: "Đắk Lắk",
        stock: 15,
        image: "images/bo sáp.jpg"
    },
    {
        id: 6,
        name: "Thổ cẩm Tây Nguyên",
        category: "tho-cam",
        price: 250000,
        origin: "Đắk Lắk",
        stock: 12,
        image: "images/thổ cẩm.jpg"
    }
];


// ===============================
// 2. LẤY KHU VỰC HIỂN THỊ SẢN PHẨM
// ===============================

const productList = document.querySelector("#product-list");


// ===============================
// 3. HÀM HIỂN THỊ SẢN PHẨM
// ===============================

function renderProducts(items) {

    // Nếu không có sản phẩm
    if (items.length === 0) {
        productList.innerHTML = `
            <p class="no-product">
                Không tìm thấy sản phẩm phù hợp.
            </p>
        `;

        return;
    }


    // Hiển thị danh sách sản phẩm
    productList.innerHTML = items.map(function (product) {

        return `
            <article class="product-card">

                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >

                <h3>${product.name}</h3>

                <p>
                    Danh mục: ${product.category}
                </p>

                <p>
                    Xuất xứ: ${product.origin}
                </p>

                <p>
                    Giá: 
                    ${product.price.toLocaleString("vi-VN")} đ
                </p>

                <p>
                    Tình trạng: 
                    ${product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </p>

                <button 
                    data-id="${product.id}"
                    ${product.stock === 0 ? "disabled" : ""}
                >
                    ${product.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
                </button>

            </article>
        `;

    }).join("");

}


// ===============================
// 4. HIỂN THỊ SẢN PHẨM KHI MỞ WEBSITE
// ===============================

renderProducts(products);


// ===============================
// 5. TÌM KIẾM VÀ LỌC SẢN PHẨM
// ===============================

// Lấy ô tìm kiếm
const searchInput = document.querySelector("#search-input");

// Lấy bộ lọc danh mục
const categoryFilter = document.querySelector("#category-filter");


// Hàm lọc sản phẩm
function filterProducts() {

    // Lấy từ khóa người dùng nhập
    const keyword = searchInput.value.toLowerCase().trim();

    // Lấy danh mục đang được chọn
    const category = categoryFilter.value;


    // Lọc sản phẩm
    const result = products.filter(function (product) {

        // Kiểm tra tên sản phẩm
        const matchName = product.name
            .toLowerCase()
            .includes(keyword);

        // Kiểm tra danh mục
        const matchCategory =
            category === "all" ||
            product.category === category;

        // Phải thỏa mãn cả 2 điều kiện
        return matchName && matchCategory;
    });


    // Hiển thị kết quả
    renderProducts(result);
}


// ===============================
// 6. SỰ KIỆN TÌM KIẾM
// ===============================

searchInput.addEventListener("input", function () {

    filterProducts();

});


// ===============================
// 7. SỰ KIỆN LỌC DANH MỤC
// ===============================

categoryFilter.addEventListener("change", function () {

    filterProducts();

});
// ===============================
// 8. GIỎ HÀNG
// ===============================

// Tạo mảng giỏ hàng
let cart = [];


// Khi người dùng nhấn nút trong danh sách sản phẩm
productList.addEventListener("click", function (event) {

    // Kiểm tra có phải nút không
    if (event.target.tagName === "BUTTON") {

        // Lấy ID sản phẩm
        const productId = Number(event.target.dataset.id);

        // Tìm sản phẩm trong mảng products
        const product = products.find(function (item) {
            return item.id === productId;
        });


        // Thêm sản phẩm vào giỏ hàng
        cart.push(product);


        // Cập nhật số lượng giỏ hàng
        updateCartCount();


        // Thông báo
        alert(product.name + " đã được thêm vào giỏ hàng!");
    }

});


// ===============================
// 9. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG
// ===============================

function updateCartCount() {

    document.querySelector("#cart-count").textContent = cart.length;

}
// ===============================
// 10. KIỂM TRA FORM ĐẶT HÀNG
// ===============================

// Lấy form đặt hàng
const orderForm = document.querySelector("#order-form");


orderForm.addEventListener("submit", function (event) {

    // Ngăn form gửi đi ngay
    event.preventDefault();


    // Lấy dữ liệu người dùng nhập
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


    // ===============================
    // KIỂM TRA HỌ TÊN
    // ===============================

    if (customerName.length < 3) {

        alert("Họ tên phải có ít nhất 3 ký tự.");

        return;
    }


    // ===============================
    // KIỂM TRA SỐ ĐIỆN THOẠI
    // ===============================

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Số điện thoại phải gồm đúng 10 chữ số.");

        return;
    }


    // ===============================
    // KIỂM TRA ĐỊA CHỈ
    // ===============================

    if (address.length < 10) {

        alert("Địa chỉ phải có ít nhất 10 ký tự.");

        return;
    }


    // ===============================
    // KIỂM TRA GIỎ HÀNG
    // ===============================

    if (cart.length === 0) {

        alert("Giỏ hàng chưa có sản phẩm.");

        return;
    }


    // ===============================
    // ĐẶT HÀNG THÀNH CÔNG
    // ===============================

    alert(
        "Đơn hàng của " +
        customerName +
        " đã được ghi nhận thành công!"
    );


    // Xóa dữ liệu trong form
    orderForm.reset();

});