// ===============================
// FILE: products.js
// Chứa toàn bộ dữ liệu sản phẩm
// Script này phải được load TRƯỚC script.js
// trong file index.html
// ===============================

// Khai báo mảng products chứa danh sách sản phẩm
// Mỗi phần tử trong mảng là một object đại diện cho 1 sản phẩm
const products = [
    {
        id: 1,                              // Mã định danh duy nhất của sản phẩm
        name: "Cà phê Buôn Ma Thuột",       // Tên sản phẩm
        category: "ca-phe",                 // Danh mục — dùng để lọc sản phẩm
        price: 120000,                      // Giá tiền (đơn vị: VNĐ)
        unit: "500g",                       // Đơn vị tính
        origin: "Đắk Lắk",                 // Xuất xứ sản phẩm
        image: "images/cà phê bmt.jpg",    // Đường dẫn đến file ảnh
        stock: 20,                          // Số lượng tồn kho
        description: "Cà phê Robusta đậm đà, thơm đặc trưng của Buôn Ma Thuột.", // Mô tả
        featured: true                      // true = sản phẩm nổi bật, false = bình thường
    },

    {
        id: 2,
        name: "Mật ong rừng Tây Nguyên",
        category: "mat-ong",
        price: 180000,
        unit: "500ml",
        origin: "Gia Lai",
        image: "images/mật ong rừng.jpg",
        stock: 10,
        description: "Mật ong rừng tự nhiên, có vị ngọt thanh và hương thơm đặc trưng.",
        featured: true
    },

    {
        id: 3,
        name: "Hạt mắc ca Tây Nguyên",
        category: "mac-ca",
        price: 200000,
        unit: "500g",
        origin: "Lâm Đồng",
        image: "images/mắc ca.jpg",
        stock: 25,
        description: "Hạt mắc ca giòn, béo và giàu dinh dưỡng.",
        featured: true
    },

    {
        id: 4,
        name: "Hồ tiêu Tây Nguyên",
        category: "tieu",
        price: 100000,
        unit: "500g",
        origin: "Đắk Nông",
        image: "images/tiêu.jpg",
        stock: 30,
        description: "Hạt tiêu cay thơm, được trồng tại vùng đất Tây Nguyên.",
        featured: false
    },

    {
        id: 5,
        name: "Bơ sáp Tây Nguyên",
        category: "bo",
        price: 80000,
        unit: "1kg",
        origin: "Đắk Lắk",
        image: "images/bơ sáp.jpg",
        stock: 15,
        description: "Bơ sáp dẻo, béo, thơm và có vị ngon đặc trưng.",
        featured: true
    },

    {
        id: 6,
        name: "Thổ cẩm Tây Nguyên",
        category: "tho-cam",
        price: 250000,
        unit: "sản phẩm",
        origin: "Đắk Lắk",
        image: "images/thổ cẩm.jpg",
        stock: 12,
        description: "Sản phẩm thổ cẩm mang nét văn hóa truyền thống của Tây Nguyên.",
        featured: false
    },

    {
        id: 7,
        name: "Nai gác bếp",
        category: "nai-gac-bep",
        price: 350000,
        unit: "500g",
        origin: "Tây Nguyên",
        image: "images/nai gác bếp.jpg",
        stock: 10,
        description: "Thịt nai gác bếp thơm ngon, đậm vị và mang hương vị đặc trưng vùng cao.",
        featured: true
    },

    {
        id: 8,
        name: "Bột ca cao",
        category: "ca-cao",
        price: 150000,
        unit: "500g",
        origin: "Đắk Lắk",
        image: "images/bột ca cao.jpg",
        stock: 20,
        description: "Bột ca cao thơm đậm, phù hợp để pha chế nhiều loại đồ uống.",
        featured: false
    },

    {
        id: 9,
        name: "Măng khô Tây Nguyên",
        category: "mang-kho",
        price: 180000,
        unit: "500g",
        origin: "Tây Nguyên",
        image: "images/măng khô.jpg",
        stock: 15,
        description: "Măng khô được sơ chế và sấy khô, thích hợp dùng trong các món ăn truyền thống.",
        featured: false
    },

    {
        id: 10,
        name: "Rượu cần Tây Nguyên",
        category: "ruou-can",
        price: 300000,
        unit: "bình",
        origin: "Tây Nguyên",
        image: "images/rượu cần.jpg",
        stock: 12,
        description: "Rượu cần mang hương vị truyền thống và nét văn hóa đặc trưng của Tây Nguyên.",
        featured: true
    }
];
