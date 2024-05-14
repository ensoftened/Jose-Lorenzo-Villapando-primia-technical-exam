export const getLastWeekOfPrevMonth = (currentYear: number, currentMonth: number) => {
    //Get the first Sunday of the last week
    const month = currentMonth - 1
    const year = currentYear
    const lastDayOfMonth = new Date(year, month + 1, 0); // Get the last day of the given month

    const lastWeekDay = lastDayOfMonth.getDay(); // Get the day of the week of the last day

    // Calculate the date of the first day of the last week
    const firstDayOfLastWeek = new Date(lastDayOfMonth);
    firstDayOfLastWeek.setDate(lastDayOfMonth.getDate() - lastWeekDay);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("firstDayOfLastWeek", firstDayOfLastWeek)
    const lastWeekDates = [];
  
    // Loop from the provided start date until the end of August
    while (firstDayOfLastWeek <= lastDayOfMonth) {
      lastWeekDates.push(new Date(firstDayOfLastWeek));
      firstDayOfLastWeek.setDate(firstDayOfLastWeek.getDate() + 1);
    }

    const x = lastWeekDates.map(date => {
        return date.getDate()
    })
  
    return x;
}
