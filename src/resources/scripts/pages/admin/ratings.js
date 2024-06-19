const checkAllElement = document.querySelector(".allcheck");
const singleChecks = document.querySelectorAll(".singleCheck");
import { getTourRatings } from "/fetch.js";
import { getRatings } from "/fetch.js";
const ratings = await getRatings();
console.log(ratings);
// const tourIdElements = document.querySelectorAll(".tourId");
// let ratings = [];

// tourIdElements.forEach((item) => {
//   item.addEventListener("click", async () => {
//     await fetchRating(item.innerHTML);
//   });
// });
// const fetchRating = async (tourId) => {
//   ratings = await getTourRatings(tourId);
// };
let modalStatus = false;
const replyBtns = document.querySelectorAll(".toursAction-icon");
const popup = document.querySelector(".reply-popup");
const modalBg = document.querySelector(".reply-popup-background");
const modal = document.querySelector(".reply-popup-modal");
const sendBtn = document.querySelector(".send");
const userName = document.querySelector(".modal-userName");
const feedback = document.querySelector(".modal-feedback");
const score = document.querySelector(".modal-rating-score");

replyBtns.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (!modalStatus) {
      userName.innerHTML = ratings[index].customer.user_name;
      feedback.innerHTML = ratings[index].rating_detail;
      score.innerHTML = ratings[index].rating_score;
      popup.style.display = "block";
      modalStatus = true;
    }
  });
});
modalBg.addEventListener("click", () => {
  if (modalStatus) {
    popup.style.display = "none";
    modalStatus = false;
  }
});
sendBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (modalStatus) {
    popup.style.display = "none";
    modalStatus = false;
  }
});
modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

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

addButton.classList.add("hidden-important");