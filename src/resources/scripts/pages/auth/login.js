const btnLogin = document.querySelector(".btn-login");
const formLogin = document.getElementById("formLogin");

const iconEye = document.querySelector(".formlogin__icon-eye");

const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');

email.addEventListener("input", checkInputs);
password.addEventListener("input", checkInputs);

function checkInputs() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue !== "" && passwordValue !== "") {
    btnLogin.disabled = false;
  } else {
    btnLogin.disabled = true;
  }
}
checkInputs();

iconEye.onclick = function () {
  let isVisible = iconEye.textContent.trim() === "visibility" ? true : false;
  if (isVisible) {
    iconEye.textContent = "visibility_off";
    password.setAttribute("type", "text");
  } else {
    iconEye.textContent = "visibility";
    password.setAttribute("type", "password");
  }
};
