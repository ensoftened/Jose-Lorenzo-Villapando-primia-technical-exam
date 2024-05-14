const addDays = (dateString: string, noOfDays: number) => {
    // Split the date string into month, day, and year

    console.log("DS", dateString)
    var parts = dateString.split('/');
    var month = parseInt(parts[0], 10);
    var day = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Create a new Date object with the given date
    var date = new Date(year, month - 1, day);

    // Add 7 days to the date
    date.setDate(date.getDate() + noOfDays);

    // Get the new month, day, and year
    var newMonth = date.getMonth() + 1;
    var newDay = date.getDate();
    var newYear = date.getFullYear();

    // Format the new date as "mm/dd/yyyy"
    var newDateString = ('0' + newMonth).slice(-2) + '/' + ('0' + newDay).slice(-2) + '/' + newYear;

    return newDateString;
}


export default addDays