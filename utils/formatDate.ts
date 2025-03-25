export function formatDate(date: string) {
    // Extract the month, date, and year from the date object
    // Clone the date object to avoid modifying the original date
    let newDate = new Date();
    if (date) {
        newDate = new Date(date);
    }
    const month = newDate.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12
    const day = newDate.getDate();
    const year = newDate.getFullYear() % 100; // get the last two digits of the year

    // Format the month, day, and year to ensure two digits with leading zeroes if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedYear = year < 10 ? `0${year}` : year;

    // Combine the formatted strings into the desired format
    return `${formattedMonth}/${formattedDay}/${formattedYear}`;
}