const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Route = require("../src/app/models/route.model");
dotenv.config();

const { db } = require("../src/config");

const linesId = [
    '6669b41502b425027ca1a19a', // Thung lũng hoa cẩm tú cầu
    '6669b41502b425027ca1a1ad', // Thung lũng Tình Yêu
    '6669b41502b425027ca1a1c1', // Rừng Lá Kim Resort
    '6669b41502b425027ca1a1f7', // Khu Du Lịch Sinh Thái Hiệp Lực
    '6669b41502b425027ca1a1fb', // KHU DU LỊCH LĂNG NGUYỄN HỮU HÀO
    '6669b41502b425027ca1a208', // Khu du lịch ĐÀ LẠT SẮC MÀU - Làng hoa Vạn Thành
    '6669b41502b425027ca1a244',
    '6669b41502b425027ca1a26a', // Điểm tham quan du lịch Nhà máy Trà Atisô & Rượu Vang Vĩnh Tiến
    '6669b41502b425027ca1a271', // Cereja Hotel & Resort - Terracotta Hotel & Resort Dalat
    '6669b41502b425027ca1a2c4', // Đập tràn Hồ Tuyền Lâm - The Lake House Dalat
];

const routeDescription = [
    "Đường vào thung lũng hoa Cẩm Tú Cầu",
    "Đường vào thung lũng Tình Yêu",
    "Đường vào Rừng Lá Kim Resort",
    "Đường vào khu du lịch sinh thái Hiệp Lực",
    "Đường vào khu du lịch lăng Nguyễn Hữu Hào",
    "Đường vào Khu du lịch ĐÀ LẠT SẮC MÀU - Làng hoa Vạn Thành",
    "Đường Cam Ly",
    "Đường vào nhà máy Trà Atisô & Rượu Vang Vĩnh Tiến",
    "Đường vào Cereja Hotel & Resort - Terracotta Hotel & Resort Dalat",
    "Đường vào Đập tràn Hồ Tuyền Lâm - The Lake House Dalat"
];

const routeName = [
    "Đường vào thung lũng hoa Cẩm Tú Cầu",
    "Đường Mai Anh Đào",
    "Đường Vòng Lâm Viên",
    "Đường vào khu du lịch sinh thái Hiệp Lực",
    "Đường Nguyễn Đình Quân",
    "Đường Hoàng Văn Thụ",
    "Đường Cam Ly",
    "Đường vào nhà máy Trà Atisô & Rượu Vang Vĩnh Tiến",
    "Đường Hoa Phượng Tím",
    "Đường bến du thuyền Hồ Tuyểt Lâm"
];

const routeLength = [
    350,
    650,
    1200,
    100,
    200,
    1600,
    1100,
    250,
    2300,
    1000
];

const createRoute = () => {
    const routes = [];
    for (let i = 0; i < routeLength.length; i++) {
        let route = {
            route_name: routeName[i],
            route_description: routeDescription[i],
            route_length: routeLength[i],
            lines: [new mongoose.Types.ObjectId(linesId[i])],
        };
        routes.push(route);
    }
    return routes;
};

const routes = createRoute();

const insertRoutes = async () => {
    try {
        await db.connect(); // Ensure the db connection is established before proceeding
        const data = await Route.create(routes);
        console.log("Thành công. Routes đã được thêm vào cơ sở dữ liệu", data);
        await mongoose.connection.close(); // Close the connection after the operation
    } catch (err) {
        console.log("Lỗi.", err);
    }
};

insertRoutes();
