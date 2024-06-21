const addButton = document.getElementById("add-button");
addButton.classList.add("hidden-important");

if(window.location.href.includes("staff")) {
    const allViewDetail =  document.getElementsByClassName('bookingsAction-icon');
    const allStaffViewDetail =  document.getElementsByClassName('bookingsAction-iconStaffUrl');
    for(let i = 0; i < allViewDetail.length; i++) {
        allViewDetail[i].href = allStaffViewDetail[i].href;
    }
}