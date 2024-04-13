const btnLogin = document.querySelector('.btn-login');
const formLogin = document.getElementById("formLogin");

const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
email.addEventListener('input', checkInputs);
password.addEventListener('input', checkInputs);

function checkInputs() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue !== '' && passwordValue !== '') {
    btnLogin.disabled = false;
  }  
  else {
    btnLogin.disabled = true; 
  }
}
checkInputs();


