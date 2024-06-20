document.getElementById('cancelDeleteButton').addEventListener('click', function() {
    document.getElementById('deletePopupContainer').style.display = 'none';
})

document.getElementById('deletePopupXmarkIcon').addEventListener('click', function() {
    document.getElementById('deletePopupContainer').style.display = 'none';
})

document.getElementById('submitDeleteButton').addEventListener('click', function() {
    const url = document.getElementById('handleRequestUrl').innerText;
    console.log("feth api: ", url);
    if(url.includes("bookings/delete")) {
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('deletePopupContainer').style.display = 'none';
            alert("Xóa thành công!");
            location.reload();
        })
        .catch(error => {
            alert("Lỗi khi xóa!")
            document.getElementById('deletePopupContainer').style.display = 'none';
        }) 
    }
    document.getElementById('deletePopupContainer').style.display = 'none';
    location.reload();
})
