/*
admin:
    email: vuphan123@gmail.com
    password: VuPhan@4321@
staff: 
    email: giabao456@gmail.com
    password: BaoMenly@4231@

    email: leducmanh123@gmail.com
    password: LeDucManh@4231@

    email: truonghuynh789@gmail.com
    password: TruongHuynh@987@

    email: quocduy987@gmail.com
    password: LeDucManh@4231@

    email: seosau4332@gmail.com
    password: ToiLaSau@123@
customer:
    email: check db
    password: Ho + Ten + @1233@  (vd: LeDuy@1233@)
*/
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const User = require('../src/app/models/user.model')
dotenv.config();

const { db } = require("../src/config");
db.connect();

async function generateHash(password) {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
}

const ho = ['Le', 'Nguyen', 'Tran', 'Huynh', 'Dang', 'Phan', 'Pham', 'Ly', 'Ho', 'Hoang', 'Ngo', 'Trinh'];
const ten = ['Duy', 'Bao', 'Manh', 'Truong', 'Sau', 'Huy', 'Hoa', 'Lan', 'Hong', 'Mai', 'Vu', "Nam"];

function generateRandomPhoneNumber() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let phoneNumber = "03";

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const randomDigit = numbers[randomIndex];
        phoneNumber += randomDigit;
    }

    return phoneNumber;
}

const createUsers = async () => {
    let admin = {
        name: 'Phan Thanh Vu',
        email: 'vuphan123@gmail.com',
        password: await generateHash('VuPhan@4321@'),
        phone_number: '0997998999',
        user_role: 'admin',
        is_authenticated: true,
    }

    let staff = [
        {
            name: 'Le Duc Manh',
            email: 'leducmanh123@gmail.com',
            password: await generateHash('LeDucManh@4231@'),
            phone_number: '0338676213',
            user_role: 'staff',
            is_authenticated: true,
        },
        {
            name: 'Tran Ngo Gia Bao',
            email: 'giabao456@gmail.com',
            password: await generateHash('BaoMenly@4231@'),
            phone_number: '0312382412',
            user_role: 'staff',
            is_authenticated: true,
        },
        {
            name: 'Huynh Sinh Truong',
            email: 'truonghuynh789@gmail.com',
            password: await generateHash('TruongHuynh@987@'),
            phone_number: '0334562432',
            user_role: 'staff',
            is_authenticated: true,
        },
        {
            name: 'Dang Quoc Duy',
            email: 'quocduy987@gmail.com',
            password: await generateHash('QuocDuy@7654@'),
            phone_number: '0338753464',
            user_role: 'staff',
            is_authenticated: true,
        },
        {
            name: 'Ma Seo Sau',
            email: 'seosau4332@gmail.com',
            password: await generateHash('ToiLaSau@123@'),
            phone_number: '0344678121',
            user_role: 'staff',
            is_authenticated: true,
        },
    ]
    let users = [admin, ...staff];
    for (let i = 0; i < 25; i++) {
        let idx1 = Math.floor(Math.random() * 10);
        let idx2 = Math.floor(Math.random() * 10);
        let phoneNumber = generateRandomPhoneNumber();
        let password = await generateHash(ho[idx1] + ten[idx2] + '@1233@');

        users.push({
            name: ho[idx1] + " " + ten[idx2],
            email: ho[idx1].toLowerCase() + ten[idx2].toLowerCase() + '@gmail.com',
            password: password,
            phone_number: phoneNumber,
            user_role: 'customer',
            is_authenticated: true,
        });
    }
    return users;
};

(async () => {
    const users = await createUsers();
    console.log(users.length);
    
    User.create(users)
        .then((data) => {
            console.log("Thành công. Users đã được thêm vào cơ sở dữ liệu", data);
        })
        .catch((err) => {
            console.log("Lỗi.", err);
        });
})();


