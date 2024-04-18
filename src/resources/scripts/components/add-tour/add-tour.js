// Khi total ticket thay đổi thì total ticket thay đổi theo
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử input
  const totalTicketInput = document.getElementById("total-ticket");
  const totalTicketAvailableInput = document.getElementById("total-ticket-available");

  // Thêm sự kiện "input" cho input "Total Ticket"
  totalTicketInput.addEventListener("input", function () {
    // Lấy giá trị của "Total Ticket"
    const totalTicketValue = parseInt(totalTicketInput.value);

    // Cập nhật giá trị của "Total Ticket Available"
    totalTicketAvailableInput.value = totalTicketValue;
  });
});

//Thêm thẻ nhập ảnh mới nếu không còn thẻ nhập ảnh nào trống
document.addEventListener("DOMContentLoaded", function () {
  // Lấy phần tử container chứa các trường "Image Source"
  const imageContainer = document.querySelector(".popup-add-tour__image-container");

  // Thêm sự kiện "input" cho container chứa các trường "Image Source"
  imageContainer.addEventListener("input", function (event) {
    const target = event.target;
    // Kiểm tra xem phần tử kích hoạt có phải là một trường "Image Source" hay không
    if (target && target.matches("input[name='image-src[]']")) {
      addNewImageItemIfNeeded();
    }
  });

  function addNewImageItemIfNeeded() {
    // Lấy tất cả các trường "Image Source"
    const imageSources = document.querySelectorAll("input[name='image-src[]']");

    // Kiểm tra xem có trường "Image Source" trống nào không
    const emptyImageSource = Array.from(imageSources).find(function (input) {
      return input.value.trim() === "";
    });

    // Nếu không có trường "Image Source" trống nào trên màn hình, thêm một image item mới
    if (!emptyImageSource) {
      const newImageItem = document.createElement("div");
      newImageItem.classList.add("popup-add-tour__image-item");
      newImageItem.innerHTML = `
          <input type="text" name="image-src[]" class="popup-add-tour__input" placeholder="Image Source">
          <input type="text" name="image-alt[]" class="popup-add-tour__input" placeholder="Image Alt">
        `;
      imageContainer.appendChild(newImageItem);
    }
  }
});

// Ẩn button khi nhấn nút x góc trên bên phải
document.addEventListener("DOMContentLoaded", function () {
  // Lấy phần tử close button
  const closeButton = document.querySelector(".popup-add-tour__close");

  // Thêm sự kiện "click" cho close button
  closeButton.addEventListener("click", function () {
    // Lấy phần tử popup
    const popup = document.querySelector(".popup-add-tour");

    // Ẩn popup
    popup.style.display = "none";
  });
});
