const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("../src/app/models/tour.model");
dotenv.config();

const { db } = require("../src/config");
db.connect();
const regions = '665c95c9fbde7cc466e2c658'

const Cereja_Terracotta_HTuyenLam_LakeHouse = [
    '661ebbc9003e6c4616babc66',
    '661ebbc9003e6c4616babc5f',
    '661ebbc9003e6c4616babc4f',
    '661ebbc9003e6c4616babc69'
]

const TLHCamTuCau_TLTinhYeu_STHiepLuc_RLaKim = [
    '661ebbc9003e6c4616babc53',
    '661ebbc9003e6c4616babc4b',
    '661ebbc9003e6c4616babc2d',
    '661ebbc9003e6c4616babc63'
]

const LNHuuHao_LHVanThanh_Atiso = [
    '661ebbc9003e6c4616babc33',
    '661ebbc9003e6c4616babc2e',
    '661ebbc9003e6c4616babc37'
]

const locations = [Cereja_Terracotta_HTuyenLam_LakeHouse, TLHCamTuCau_TLTinhYeu_STHiepLuc_RLaKim, LNHuuHao_LHVanThanh_Atiso]

const tourGuideIds = [
    '661fe62db3060de4f1801e34', // duy
    '661fe62db3060de4f1801e32', // bao
    '661fe62db3060de4f1801e35', // sau
]

const vehicleIds = [
    ['665c97937d8b0969909dcc0a', // 29
        '665c97937d8b0969909dcc0b'], // 29
    ['665c97937d8b0969909dcc0c'], // 16
    ['665c97937d8b0969909dcc19', // 29
        '665c97937d8b0969909dcc1a'], // 29
]

const routeIds = [
    '665dc688b5329c687e6c03e7', // rung la kim
    '665dc688b5329c687e6c03e8', // KDL sinh thai hiep luc
    '665dc688b5329c687e6c03e9', // lang NHH
    '665dc688b5329c687e6c03ea', // LHVT
    '665dc688b5329c687e6c03eb', // Cam ly
    '665dc688b5329c687e6c03e6', // TLTY
    '665dc688b5329c687e6c03e5', // TLHCTC
    '665dc688b5329c687e6c03ee', // HTL - TLHouse
    '665dc688b5329c687e6c03ed', // Cereja Hotel & Resort - Terracotta Hotel & Resort
    '665dc688b5329c687e6c03ec' // atiso
]

const tourNames = [
    'Tour Đà Lạt Thơ Mộng: Khám Phá Cereja, Terracotta, Hồ Tuyền Lâm và The Lake House',
    'Lăng Nguyễn Hữu Hào - Làng Hoa Vạn Thành - Nhà Máy Trà Atisô & Rượu Vang Vĩnh Tiến',
    'Thung lũng Hoa Cẩm Tú Cầu - Thung lũng Tình Yêu - Khu du lịch sinh thái Hiệp Lực - Rừng Lá Kim'
]

const tourDescriptions = [
    '"Tour Đà Lạt Thơ Mộng: Khám Phá Cereja, Terracotta, Hồ Tuyền Lâm và The Lake House" mang đến cho bạn trải nghiệm tuyệt vời tại những điểm đến đẹp nhất Đà Lạt. Bắt đầu với Cereja Hotel & Resort, nơi bạn có thể tận hưởng không gian sang trọng và phong cảnh tuyệt đẹp. Tiếp theo, Terracotta Hotel & Resort chào đón bạn với kiến trúc độc đáo và khu vườn xanh mát. Sau đó, bạn sẽ khám phá Hồ Tuyền Lâm, một hồ nước trong xanh và yên bình, lý tưởng để thư giãn và ngắm cảnh. Cuối cùng, The Lake House mang đến cho bạn không gian ấm cúng và thanh bình, hoàn hảo để kết thúc hành trình đầy cảm hứng và lãng mạn này.',
    '"Tour Đặc Sắc Đà Lạt" sẽ đưa bạn khám phá những điểm đến độc đáo và hấp dẫn của thành phố ngàn hoa. Bắt đầu với Lăng Nguyễn Hữu Hào, nơi bạn có thể tìm hiểu về lịch sử và văn hóa Đà Lạt qua câu chuyện của gia đình vua Bảo Đại. Tiếp theo, Làng Hoa Vạn Thành chào đón bạn với muôn vàn loài hoa khoe sắc, biểu tượng cho sự trù phú và nghệ thuật trồng hoa của người dân địa phương. Cuối cùng, bạn sẽ ghé thăm Nhà Máy Trà Atisô & Rượu Vang Vĩnh Tiến, nơi bạn có thể thưởng thức những sản phẩm đặc trưng của Đà Lạt và tìm hiểu quy trình sản xuất trà atisô và rượu vang thơm ngon.',
    '"Tour Thiên Nhiên Lãng Mạn Đà Lạt" mang đến cho bạn hành trình khám phá vẻ đẹp và sự lãng mạn của thành phố ngàn hoa. Khởi đầu tại Thung Lũng Hoa Cẩm Tú Cầu, bạn sẽ đắm chìm trong sắc màu rực rỡ của hàng ngàn bông cẩm tú cầu. Tiếp theo, Thung Lũng Tình Yêu chào đón bạn với cảnh quan thơ mộng và không khí ngọt ngào, hoàn hảo cho những khoảnh khắc lãng mạn. Khu Du Lịch Sinh Thái Hiệp Lực là điểm dừng chân tiếp theo, nơi bạn có thể tham gia các hoạt động ngoài trời và tận hưởng vẻ đẹp thiên nhiên hoang sơ. Chuyến hành trình kết thúc tại Rừng Lá Kim, một khu rừng xanh mát và yên bình, lý tưởng để thư giãn và hít thở không khí trong lành của Đà Lạt',
]

const routes = [
    [
        {
            start_coordinate: {
                longitude: 108.43449383019681,
                latitude: 11.888687678726601,
            },
            end_coordinate: {
                longitude: 108.43797895277208,
                latitude: 11.899888911954147,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03ed'),
        },
        {
            start_coordinate: {
                longitude: 108.43858258992329,
                latitude: 11.90071898362198,
            },
            end_coordinate: {
                longitude: 108.43430572054524,
                latitude: 11.900939509948708,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03ee'),
        },
    ],
    [
        {
            start_coordinate: {
                longitude: 108.41753139221626,
                latitude: 11.940857007618256,
            },
            end_coordinate: {
                longitude: 108.41798974324637,
                latitude: 11.94104373413919,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03e9'),
        },
        {
            start_coordinate: {
                longitude: 108.41798974324637,
                latitude: 11.94104373413919,
            },
            end_coordinate: {
                longitude: 108.41205351178212,
                latitude: 11.947135673384228,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03ea'),
        },
        {
            start_coordinate: {
                longitude: 108.41205351178212,
                latitude: 11.947135673384228,
            },
            end_coordinate: {
                longitude: 108.402843348872,
                latitude: 11.948714500469908,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03eb'),
        },
        {
            start_coordinate: {
                longitude: 108.402843348872,
                latitude: 11.948714500469908,
            },
            end_coordinate: {
                longitude: 108.40278353962118,
                latitude: 11.948530029156993,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03ec'),
        },
    ],
    [
        {
            start_coordinate: {
                longitude: 108.44501127847697,
                latitude: 11.978022827344887,
            },
            end_coordinate: {
                longitude: 108.44731918201165,
                latitude: 11.977486173281086,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03e5'),
        },
        {
            start_coordinate: {
                longitude: 108.44731918201165,
                latitude: 11.977486173281086,
            },
            end_coordinate: {
                longitude: 108.45326607959225,
                latitude: 11.977958466927829,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03e6'),
        },
        // {
        //     start_coordinate: {
        //         longitude: 108.45650273487935,
        //         latitude: 11.979822224219005,
        //     },
        //     end_coordinate: {
        //         longitude: 108.45651803958027,
        //         latitude: 11.97983751125635,
        //     },
        //     route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03e8'),
        // },
        {
            start_coordinate: {
                longitude: 108.45326607959225,
                latitude: 11.977958466927829,
            },
            end_coordinate: {
                longitude: 108.46140843096397,
                latitude: 11.978182874039408,
            },
            route: new mongoose.Types.ObjectId('665dc688b5329c687e6c03e7'),
        },
        
        
    ]

]

const createTour = () => {
    const tours = [];
    for (let i = 0; i < 3; i++) {
        let tour = {
            tour_name: tourNames[i],
            tour_price: Math.floor(Math.random() * 10000) * 1000,
            tour_category: ['Đà Lạt'],
            tour_starting_day: new Date('2024-06-25T10:30:00'),
            tour_number_of_days: 3,
            tour_number_of_nights: 2,
            tour_description: tourDescriptions[i],
            tour_total_ticket: 50,
            tour_total_ticket_available: 35,
            tour_average_rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
            tour_total_rating: Math.floor(Math.random() * 100),
            tour_images: [
                {
                    link: null,
                    alt: null,
                },
            ],
            destinations: locations[i].map(location => (
                new mongoose.Types.ObjectId(location)
            )),
            vehicles: vehicleIds[i].map(vehicle => (
                new mongoose.Types.ObjectId(vehicle)
            )),
            region: new mongoose.Types.ObjectId(regions),
            guides: [new mongoose.Types.ObjectId(tourGuideIds[i])],
            routes: routes[i],
        }
        tours.push(tour);
    }
    return tours;
}

const tours = createTour();
Tour.create(tours)
    .then((data) => {
        console.log("Thành công. Tour đã được thêm vào cơ sở dữ liệu", data);
    })
    .catch((err) => {
        console.log("Lỗi.", err);
    });