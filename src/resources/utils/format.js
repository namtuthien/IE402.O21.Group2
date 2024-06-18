function convertDateToHourDayMonthYear(dateString) {
  const date = new Date(dateString);

  const hours = ("0" + date.getUTCHours()).slice(-2);
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);

  const day = ("0" + date.getUTCDate()).slice(-2);
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

function convertHourDayMonthYearToDate(string) {
  // Tách thời gian và ngày
  let [time, date] = string.split(' - ');

  // Tách giờ và phút
  let [hours, minutes] = time.split(':');

  // Tách ngày, tháng và năm
  let [day, month, year] = date.split('/');

  // Tạo đối tượng Date
  let dateObj = new Date(Date.UTC(year, month - 1, day, hours, minutes));

  // Chuyển đổi sang định dạng ISO 8601
  let isoString = dateObj.toISOString();

  return isoString;
}

export { convertDateToHourDayMonthYear, convertHourDayMonthYearToDate };
