document.getElementById('cancelDeleteButton').addEventListener('click', function() {
    document.getElementById('deletePopupContainer').style.display = 'none';
})

document.getElementById('deletePopupXmarkIcon').addEventListener('click', function() {
    document.getElementById('deletePopupContainer').style.display = 'none';
})

document.getElementById('submitDeleteButton').addEventListener('click', function() {
    const url = document.getElementById('handleRequestUrl').innerText;
    console.log("feth api: ", url);
})
