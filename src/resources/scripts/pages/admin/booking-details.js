
document.getElementById('removeBookingButton').addEventListener('click', function () {
    document.getElementById('deletePopupContainer').style.display='flex';
})

document.getElementById('updateBookingButton').addEventListener('click', function () {
    const bookingForm = document.getElementById('bookingDetailsForm');
    const formData = new FormData(bookingForm);
    const data = {
        _id: formData.get('booking-details-booking-id'),
        customer: formData.get('booking-details-customer-id'),
        tour: formData.get('booking-details-tour-id'),
        staff: formData.get('booking-details-staff-id'),
        payment_id: formData.get('booking-details-payment-id'),
        booking_amount: formData.get('booking-amount'),
        booking_total_price: formData.get('booking-total-price'),
        // createDate: formData.get('booking-create-date'),
        booking_status: formData.get('booking-status') != "canceled" ? true : false,
        booking_note: formData.get('booking-description')
    };
    console.log(data);
    fetch(`/admin/bookings/update/${data._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert("Cập nhật thành công!")
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})