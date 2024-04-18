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
customer:
    user_email: check db
    user_password: Ho + Ten + @1233@  (vd: LeDuy@1233@)
*/
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../src/app/models/user.model");
dotenv.config();

const { db } = require("../src/config");
db.connect();

async function generateHash(password) {
  const hashedpassword = await bcrypt.hash(password, 8);
  return hashedpassword;
}

const ho = [
  "Le",
  "Nguyen",
  "Tran",
  "Huynh",
  "Dang",
  "Phan",
  "Pham",
  "Ly",
  "Ho",
  "Hoang",
  "Ngo",
  "Trinh",
];
const ten = [
  "Duy",
  "Bao",
  "Manh",
  "Truong",
  "Sau",
  "Huy",
  "Hoa",
  "Lan",
  "Hong",
  "Mai",
  "Vu",
  "Nam",
];

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

function generateRandomBirthday() {
  const startDate = new Date(2000, 0, 2);
  const endDate = new Date(2005, 11, 32);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  return randomDate;
}

generateRandomBirthday();

const createUsers = async () => {
  let admin = {
    user_name: "Phan Thanh Vu",
    user_email: "vuphan123@gmail.com",
    user_password: await generateHash("VuPhan@4321@"),
    user_phone_number: "0997998999",
    user_role: "admin",
    user_birthday: '',
    user_gender: 1,
    user_address: {
      street: "Hàn Thuyên",
      ward: "Linh Trung",
      district: "Thủ Đức",
      province: "Thành phố Hồ Chí Minh",
    },
    // is_authenticated: true,
  };

  let staff = [
    {
      user_name: "Le Duc Manh",
      user_email: "leducmanh123@gmail.com",
      user_password: await generateHash("LeDucManh@4231@"),
      user_phone_number: "0338676213",
      user_role: "staff",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Tran Ngo Gia Bao",
      user_email: "giabao456@gmail.com",
      user_password: await generateHash("BaoMenly@4231@"),
      user_phone_number: "0312382412",
      user_role: "staff",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Huynh Sinh Truong",
      user_email: "truonghuynh789@gmail.com",
      user_password: await generateHash("TruongHuynh@987@"),
      user_phone_number: "0334562432",
      user_role: "staff",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Dang Quoc Duy",
      user_email: "quocduy987@gmail.com",
      user_password: await generateHash("QuocDuy@7654@"),
      user_phone_number: "0338753464",
      user_role: "staff",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Ma Seo Sau",
      user_email: "seosau4332@gmail.com",
      user_password: await generateHash("ToiLaSau@123@"),
      user_phone_number: "0344678121",
      user_role: "staff",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Le Duc Manh",
      user_email: "leducmanh123.tourguide@gmail.com",
      user_password: await generateHash("LeDucManh@4231@"),
      user_phone_number: "0338676213",
      user_role: "tourguide",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Tran Ngo Gia Bao",
      user_email: "giabao456.tourguide@gmail.com",
      user_password: await generateHash("BaoMenly@4231@"),
      user_phone_number: "0312382412",
      user_role: "tourguide",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Huynh Sinh Truong",
      user_email: "truonghuynh789.tourguide@gmail.com",
      user_password: await generateHash("TruongHuynh@987@"),
      user_phone_number: "0334562432",
      user_role: "tourguide",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Dang Quoc Duy",
      user_email: "quocduy987.tourguide@gmail.com",
      user_password: await generateHash("QuocDuy@7654@"),
      user_phone_number: "0338753464",
      user_role: "tourguide",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
    {
      user_name: "Ma Seo Sau",
      user_email: "seosau4332.tourguide@gmail.com",
      user_password: await generateHash("ToiLaSau@123@"),
      user_phone_number: "0344678121",
      user_role: "tourguide",
      user_birthday: '',
      user_gender: 1,
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
    },
  ];
  let users = [admin, ...staff];
  for (let i = 0; i < 25; i++) {
    let idx1 = Math.floor(Math.random() * 12);
    let idx2 = Math.floor(Math.random() * 12);
    let phoneNumber = generateRandomPhoneNumber();
    let user_password = await generateHash(ho[idx1] + ten[idx2] + "@1233@");
    let birthday = generateRandomBirthday();

    users.push({
      user_name: ho[idx1] + " " + ten[idx2],
      user_email: ho[idx1].toLowerCase() + ten[idx2].toLowerCase() + Math.floor(Math.random() * 12) + "@gmail.com",
      user_password: user_password,
      user_phone_number: phoneNumber,
      user_birthday: birthday,
      user_gender: Math.floor(Math.random() * 2),
      user_role: "customer",
      user_address: {
        street: "Hàn Thuyên",
        ward: "Linh Trung",
        district: "Thủ Đức",
        province: "Thành phố Hồ Chí Minh",
      },
      // is_authenticated: true,
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
