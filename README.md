# ỨNG DỤNG CÔNG NGHỆ GIS VÀO XÂY DỰNG HỆ THỐNG WEBSITE ĐẶT TOUR DU LỊCH 2TOUR.

* Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh
* Khoa: Khoa học và Kỹ thuật thông tin
* Môn học: Hệ thống Thông tin Địa lý 3 chiều - Lớp: IE402.O21.Group2
* Giảng viên hướng dẫn: ThS. Phan Thanh Vũ
* Nhóm sinh viên thực hiện: Nhóm 2

## Danh sách thành viên
|STT | Họ tên | MSSV | Vai trò |
|:---:|:-------------:|:-----:|:-----:|
|1. 	| Lê Đức Mạnh | 21521116| Nhóm trưởng |
|2. 	| Đặng Quốc Duy	| 21520766 | Thành viên |
|3. 	| Huỳnh Sinh Trường		|	21521600 | Thành viên |
|4.   | Trần Ngô Gia Bảo | 21521864 | Thành viên |
|5. 	| Ma Seo Sầu | 21522548 | Thành viên |

## Phạm vi đề tài
Nhóm tập trung vào việc ứng dụng công nghệ GIS vào xây dựng hệ thống website đặt tour du lịch, nhằm mục đích cải thiện trải nghiệm người dùng, cũng như tăng hiệu quả của việc quản lý địa điểm, tour... theo thời gian thực.

## Công nghệ sử dụng
* **Front-end**: HTML, CSS, JS, Handlebars, Boostrap 5. 
* **Back-end**: Nodejs, Express.
* **Database**: MongoDB Atlas.
* **Map**: ArcGIS JS API, SerpApi.

## Hướng cài đặt

#### Yêu cầu cài đặt:
* [Node.js](https://nodejs.org/) v18.18 hoặc v19+ để có thể chạy chương trình.

#### Bước 1: Thực hiện clone repository này với lệnh:
```
$ git clone https://github.com/namtuthien/IE402.O21.Group2.git
```

#### Bước 2: Mở dự án vừa clone và thực hiện các câu lệnh sau:
```
$ cd .\IE402.O21.Group2\
$ npm install
$ npm start
```

#### Bước 3: Tạo file .env:
```
MONGO_CONNECTION_STRING=mongodb+srv://your_url
SERP_API_KEY=your_api_key
JWT_SECRET=cfb4bd8f032da6bd340f709b2c8b298bfc12c6e8c232e2651f650e051c5b19f7   
JWT_COOKIE_EXPIRES=7
```

#### Bước 4: Truy cập vào website bằng cách mở đường dẫn tại terminal:
![image](https://github.com/namtuthien/IE402.O21.Group2/assets/96688782/41c6597b-efc1-41e8-8536-62c314033ed5)


#### Bước 5: Để sử dụng các tính năng trên website, bạn có thể đăng nhập bằng một trong những tài khoản sau đây:
```
/*
admin:
    user_email: vuphan123@gmail.com
    user_password: VuPhan@4321@
staff: 
    user_email: giabao456@gmail.com
    user_password: BaoMenly@4231@

    user_email: leducmanh123@gmail.com
    user_password: LeDucManh@4231@

    user_email: truonghuynh789@gmail.com
    user_password: TruongHuynh@987@

    user_email: quocduy987@gmail.com
    user_password: LeDucManh@4231@

    user_email: seosau4332@gmail.com
    user_password: ToiLaSau@123@
tourguide: 
    user_email: giabao456.tourguide@gmail.com
    user_password: BaoMenly@4231@

    user_email: leducmanh123.tourguide@gmail.com
    user_password: LeDucManh@4231@

    user_email: truonghuynh789.tourguide@gmail.com
    user_password: TruongHuynh@987@

    user_email: quocduy987.tourguide@gmail.com
    user_password: LeDucManh@4231@

    user_email: seosau4332.tourguide@gmail.com
    user_password: ToiLaSau@123@
*/
```

## Một số trang giao diện trên website:
![image](https://github.com/namtuthien/IE402.O21.Group2/assets/96688782/934e8453-e628-4842-8580-9ff85e1175f2)

![image](https://github.com/namtuthien/IE402.O21.Group2/assets/96688782/5fe9b007-460d-41e1-9e18-dbc6bcb31963)

![image](https://github.com/namtuthien/IE402.O21.Group2/assets/96688782/8807b220-7959-419f-ade5-3df720a87fe0)

![image](https://github.com/namtuthien/IE402.O21.Group2/assets/96688782/0fd6fa91-9ae9-4662-951b-97f87c40411d)
