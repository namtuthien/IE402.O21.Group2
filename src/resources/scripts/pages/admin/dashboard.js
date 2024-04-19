const chartRevenue = document.getElementById('revenue');
const chartCancelAndSuccessBooking = document.getElementById('cancelAndSuccessBooking');
const chartBookingRate = document.getElementById('bookingRate');

const currentDate = new Date();

// Mảng chứa tên của các tháng
const monthNames = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

// Mảng chứa labels cho 12 tháng gần nhất
const labels12Month = [];
const labels4Month = [];
const labelsTemp12Month = [];
const labelsTemp4Month = [];
for (let i = 0; i < 12; i++) {
  const month = (currentDate.getMonth() - i + 12) % 12;
  const year = currentDate.getFullYear() - (i > 0 && month > currentDate.getMonth() ? 1 : 0);

  const labelInfo = { month: month + 1, year: year };
  // Tạo label và thêm vào mảng labels
  labels12Month.unshift(`${monthNames[month]}`);
  labelsTemp12Month.unshift(labelInfo);
}

for (let i = 0; i < 4; i++) {
  const month = (currentDate.getMonth() - i + 12) % 12;
  const year = currentDate.getFullYear() - (i > 0 && month > currentDate.getMonth() ? 1 : 0);

  const labelInfo = { month: month + 1, year: year };
  // Tạo label và thêm vào mảng labels
  labels4Month.unshift(`${monthNames[month]}`);
  labelsTemp4Month.unshift(labelInfo);
}

fetch('/admin/dashboard/createStatistical')
  .then(response => {
    if (!response.ok) {
      alert("404")
    }
    return response.json();
  })
  .then(response => {
    let revenuePerMonthYear = response.revenuePerMonthYear.map(data => ({
      month: data.month,
      year: data.year,
      totalRevenue: data.totalRevenue
    }));

    // 
    let bookingPerMonthYear = response.bookingPerMonthYear.map(data => ({
      month: data.month,
      year: data.year,
      totalBooking: data.totalBooking
    }));

    let cancelBookingPerMonthYear = response.cancelBookingPerMonthYear.map(data => ({
      month: data.month,
      year: data.year,
      totalCancelBooking: data.totalCancelBooking
    }));

    let successBookingPerMonthYear = response.successBookingPerMonthYear.map(data => ({
      month: data.month,
      year: data.year,
      totalSuccessBooking: data.totalSuccessBooking
    }));

    let totalBookingInDaLat = response.totalBookings;
    const totalBookingInVietNam = [totalBookingInDaLat, 100, 123, 76, 58, 300];
    let sum = totalBookingInVietNam.reduce((acc, currentValue) => acc + currentValue, 0);

    const bookingRate = totalBookingInVietNam.map(number => (number / sum) * 100);

    const totalRevenue = [];
    const totalBooking = [];
    const totalCancelBooking = [];
    const totalSuccessBooking = [];
    for (let label of labelsTemp12Month) {
      let hasData = false;
      for (let data of revenuePerMonthYear) {
        if (data.month === label.month && data.year === label.year) {
          totalRevenue.push(data.totalRevenue)
          hasData = true;
        }
      }
      if (!hasData) {
        totalRevenue.push(0);
      }
    }

    for (let label of labelsTemp12Month) {
      let hasData = false;
      for (let data of bookingPerMonthYear) {
        if (data.month === label.month && data.year === label.year) {
          totalBooking.push(data.totalBooking)
          hasData = true;
        }
      }
      if (!hasData) {
        totalBooking.push(0);
      }
    }

    for (let label of labelsTemp4Month) {
      let hasData = false;
      for (let data of cancelBookingPerMonthYear) {
        if (data.month === label.month && data.year === label.year) {
          totalCancelBooking.push(data.totalCancelBooking)
          hasData = true;
        }
      }
      if (!hasData) {
        totalCancelBooking.push(0);
      }
    }

    for (let label of labelsTemp4Month) {
      let hasData = false;
      for (let data of successBookingPerMonthYear) {
        if (data.month === label.month && data.year === label.year) {
          totalSuccessBooking.push(data.totalSuccessBooking)
          hasData = true;
        }
      }
      if (!hasData) {
        totalSuccessBooking.push(0);
      }
    }

    const dataBarLine = {
      labels: labels12Month,
      datasets: [
        {
          label: 'Doanh thu',
          data: totalRevenue,
          backgroundColor: [
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
            'rgba(5, 140, 127, 0.2)',
          ],
          borderColor: [
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
          ],
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Số Tour được đặt trong tháng',
          data: totalBooking,
          fill: false,
          backgroundColor: 'rgb(255, 0, 0)',
          borderColor: 'rgba(255, 0, 0, 0.4)',
          tension: 0.1,
          yAxisID: 'y1'
        }
      ]
    };

    const dataBar = {
      labels: labels4Month,
      datasets: [
        {
          label: 'Tổng số Tour đặt',
          data: totalBooking.slice(-4),
          backgroundColor: [
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
          ],
          borderColor: [
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
            'rgb(5, 140, 127)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Tổng số Tour đặt thành công',
          data: totalSuccessBooking,
          backgroundColor: [
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
          ],
          borderColor: [
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
            'rgb(55, 125, 255)',
          ],
          borderWidth: 1,
        },
        {
          label: 'Tổng số Tour đã hủy',
          data: totalCancelBooking,
          backgroundColor: [
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
          ],
          borderColor: [
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
            'rgb(252, 186, 3)',
          ],
          borderWidth: 1,
        },
      ]
    }

    const dataPie = {
      labels: ['Đà Lạt', 'Vũng Tàu', 'Phú Quốc', 'Nha Trang', 'Đà Nẵng', 'Khác'],
      datasets: [
        {
          label: 'Tỷ lệ đặt Tour',
          data: bookingRate,
          backgroundColor: [
            'rgb(55, 125, 255)',
            'rgb(0, 172, 71)',
            'rgb(255, 125, 255)',
            'rgb(255, 0, 0)',
            'rgb(127, 0, 255)',
            'rgba(0, 0, 0, 0.2)',
          ],
          hoverOffset: 4
        }
      ]
    }


    new Chart(chartRevenue, {
      type: 'bar',
      data: dataBarLine,
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            axisLabel: {
              display: true,
              labelString: 'Doanh thu'
            },
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            axisLabel: {
              display: true,
              labelString: 'Số khách đặt Tour'
            },
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          }
        }
      }
    });

    new Chart(chartCancelAndSuccessBooking, {
      type: 'bar',
      data: dataBar,
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            axisLabel: {
              display: true,
            },
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true
            }
          },
        }
      }
    })

    new Chart(chartBookingRate, {
      type: 'pie',
      data: dataPie,
      options: {
        responsive: true,
      },
    })
  })