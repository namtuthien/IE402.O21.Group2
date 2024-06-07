//
//
//
//
//JS Thêm điểm đến===============================================================================================================
document.getElementById('addLocationButton').addEventListener('click', function () {
  document.getElementById('allLocationDiv').style.display = 'block';
})
document.getElementById('hideLocationDiv').addEventListener('click', function () {
  document.getElementById('allLocationDiv').style.display = 'none';
})
const locations = document.getElementsByClassName('tour-popup__location');
for (let i = 0; i< locations.length; i++) {
  locations[i].addEventListener('click', function() {
    const pElement = document.createElement('p');
    pElement.className = 'tour-popup__button tour-popup__tab';
    pElement.innerHTML = `
      ${this.textContent}
      <button type="button" class="tour-popup__remove-button">
          <i class="material-icons tour-popup__hidden-tab">close</i>
      </button>
    `
    document.getElementById('tour-popup__current-locations').appendChild(pElement);
    document.getElementById('allLocationDiv').style.display = 'none';
  })
}

const removeButtons = document.getElementsByClassName('tour-popup__remove-button');
for(let i = 0; i < removeButtons.length; i++) {
  removeButtons[i].addEventListener('click', function() {
    // const tabs = document.getElementsByClassName('tour-popup__tab');
    // tabs[i].remove();
    this.closest('p').remove()
  })
}

//
//
//
//
//JS Thêm khu vực===============================================================================================================
document.getElementById('addAreaButton').addEventListener('click', function () {
  document.getElementById('allAreaDiv').style.display = 'block';
})
document.getElementById('hideAreaDiv').addEventListener('click', function () {
  document.getElementById('allAreaDiv').style.display = 'none';
})
const areas = document.getElementsByClassName('tour-popup__area');
for (let i = 0; i< areas.length; i++) {
  areas[i].addEventListener('click', function() {
    const pElement = document.createElement('p');
    pElement.className = 'tour-popup__button tour-popup__tab';
    pElement.innerHTML = `
      ${this.textContent}
      <button type="button" class="tour-popup__remove-button">
          <i class="material-icons tour-popup__hidden-tab">close</i>
      </button>
    `
    document.getElementById('tour-popup__current-areas').appendChild(pElement);
    document.getElementById('allAreaDiv').style.display = 'none';
  })
}

//
//
//
//
// JS Hiển thị ảnh khi nhấn chọn ảnh===============================================================================================================
document.getElementById("addImageButton").addEventListener('click', function() {
  document.getElementById('imageInput').click()
})

document.getElementById('imageInput').addEventListener('change', function(event) {
  const file = event.target.files[0]
  if(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Hiển thị ảnh đã chọn (có thể thay đổi theo yêu cầu)
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.className = 'tour-popup__image-placeholder';
        const divElement = document.createElement('div');
        divElement.className = 'tour-popup__image-button tour-popup__image';
        divElement.appendChild(imgElement);
        document.querySelector('.tour-popup__all-image-div').appendChild(divElement);
    };
    reader.readAsDataURL(file);
  }
})

