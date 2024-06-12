document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const selectProvinceElement = document.getElementById("staff-province");
    const selectDistrictElement = document.getElementById("staff-district");
    const selectWardElement = document.getElementById("staff-ward");
    const inputStreetElement = document.getElementById("staff-street");
    const submitButtonElement = document.getElementById("staff__submit-button")

    fetch("https://vapi.vnappmob.com/api/province", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.results) {
                data.results.forEach(province => {
                    const option = document.createElement("option");
                    option.setAttribute("data-id", province.province_id)
                    option.value = province.province_name;
                    option.textContent = province.province_name;
                    selectProvinceElement.appendChild(option);
                });
            } else {
                console.error("No provinces found in response");
            }
        })
        .catch(error => console.error("Error fetching provinces:", error));

    selectProvinceElement.addEventListener("change", function () {
        const selectedProvinceId = selectProvinceElement.options[selectProvinceElement.selectedIndex].getAttribute("data-id");

        // Clear district and ward
        selectDistrictElement.innerHTML = '<option value="" disabled selected>Chọn quận/huyện</option>';
        selectWardElement.innerHTML = '<option value="" disabled selected>Chọn phường/xã</option>';

        // Fetch districts based on selected province
        fetch(`https://vapi.vnappmob.com/api/province/district/${selectedProvinceId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.results) {
                    data.results.forEach(district => {
                        const option = document.createElement("option");
                        option.setAttribute("data-id", district.district_id);
                        option.value = district.district_name;
                        option.textContent = district.district_name;
                        selectDistrictElement.appendChild(option);
                    });
                } else {
                    console.error("No districts found in response");
                }
            })
            .catch(error => console.error("Error fetching districts:", error));
    });
    selectDistrictElement.addEventListener("change", function () {
        const selectedDistrictId = selectDistrictElement.options[selectDistrictElement.selectedIndex].getAttribute("data-id");

        // clear ward
        selectWardElement.innerHTML = '<option value="" disabled selected>Chọn phường/xã</option>';

        fetch(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrictId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.results) {
                    data.results.forEach(ward => {
                        const option = document.createElement("option");
                        option.value = ward.ward_name;
                        option.textContent = ward.ward_name;
                        selectWardElement.appendChild(option);
                    });
                } else {
                    console.error("No wards found in response");
                }
            })
            .catch(error => console.error("Error fetching wards:", error));
    });

    submitButtonElement.addEventListener("click", () => {
        const user_id = currentPath.split("/").pop();
        const user_name = document.getElementById("staff-name").value;
        const user_gender = document.getElementById("staff-gender").value
        const user_phone_number = document.getElementById("staff-phone").value;
        const user_email = document.getElementById("staff-email").value;
        const user_password = document.getElementById("staff-password").value;
        const user_birthday = document.getElementById("staff-birthday").value;
        const province = document.getElementById("staff-province").value;
        const district = document.getElementById("staff-district").value;
        const ward = document.getElementById("staff-ward").value;
        const street = document.getElementById("staff-street").value;

        if (user_name === "" || user_email === "" || user_gender === "" || 
            user_phone_number === "" || user_password === "" || 
            user_birthday === "" || province === "" || district === "" || 
            ward === "" || street === "") {
            alert("Vui lòng nhập đầy đủ thông tin")
            return;
        }

        const staffData = {
            user_name: user_name,
            user_gender: user_gender,
            user_phone_number: user_phone_number,
            user_email: user_email,
            user_password: user_password,
            user_birthday: new Date(user_birthday),
            user_address: {
                street: street,
                ward: ward,
                district: district,
                province: province,
            }
        }
        if (currentPath.includes("addstaff") || currentPath.includes("addStaff")) {
            try {
                fetch(`/admin/staff/addStaff`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(staffData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:');
                        window.location.href = `/admin/staffs`
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);

                    });
            } catch (error) {
                console.error('Error:', error);

            }
        }
        else {
            try {
                fetch(`/admin/staff/update/${user_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(staffData)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok ' + response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Success:');
                        window.location.href = `/admin/staffs`
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);

                    });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    })
});