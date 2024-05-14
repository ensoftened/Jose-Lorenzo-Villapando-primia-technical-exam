const enumerateDates = (startDate: string, endDate: string) => {
    const dates = [];
    let currentDate = new Date(startDate);
    //console.log("CURRENT DATE", currentDate)
    while (currentDate <= new Date(endDate)) {
      const dateString = currentDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });

      //console.log("PUSHING")
      const dayString = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

      dates.push({ date: dateString, day: dayString });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates

}

export default enumerateDates