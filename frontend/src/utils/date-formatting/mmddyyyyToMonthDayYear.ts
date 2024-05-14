const mmddyyyyToMonthDayYear = (inputDate: string) => {
  const dateParts = inputDate.split('/');
  if (dateParts.length !== 3) {
    return 'Invalid date format';
  }

  const month = parseInt(dateParts[0], 10);
  const day = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    return 'Invalid date format';
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const formattedDate = `${months[month - 1]} ${day}, ${year}`;
  return formattedDate;
}

export default mmddyyyyToMonthDayYear