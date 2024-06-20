const checkAllElement = document.querySelector(".allcheck");
const singleChecks = document.querySelectorAll(".singleCheck");
checkAllElement.addEventListener("change", () => {
  if (checkAllElement.checked) {
    singleChecks.forEach((singleCheck) => {
      singleCheck.checked = true;
    });
  } else {
    singleChecks.forEach((singleCheck) => {
      singleCheck.checked = false;
    });
  }
});

singleChecks.forEach((singleCheck) => {
  singleCheck.addEventListener("change", () => {
    let allChecked = true;
    singleChecks.forEach((singleCheck) => {
      if (!singleCheck.checked) {
        allChecked = false;
      }
    });
    checkAllElement.checked = allChecked;
  });
});

const addButton = document.getElementById("add-button");

addButton.addEventListener("click", () => {
  window.location.href = "/admin/map/tours"
})
