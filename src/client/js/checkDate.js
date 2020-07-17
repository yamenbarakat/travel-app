const date = document.getElementById('date');

// for choosin date Set the current date as a minimum and add 16 to it as a maximum whenever the page loads 

// helper date function for checking the months and days if they are less than 10
const checkMonthAndDay = (y, m, d) => {
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10)  {
        d = '0' + d
    }
    return [y, m, d].join('-')
}

// helper date function for checking the days if they are above the month's days
const checkDays = (m, d) => {
    // store the max range of days
    let limit = d + 16;

    let newMonthDays;

    if (d === 31 && limit > 31) {
        newMonthDays = limit - 31;
    } else if (d === 30 && limit > 30) {
        newMonthDays = limit - 30;
    } else if (d === 28 && limit > 28) {
        newMonthDays = limit - 28;
    }
    m++
    d = newMonthDays;
}

// main date function
const dateUpdate = window.addEventListener('load', () => {
    // Create a new date instance
    const d = new Date();

    // make the date format to YYYY-MM-DD
    let years = d.getFullYear();
    let months = (d.getMonth() + 1);
    let days = d.getDate();

    let minDate = checkMonthAndDay(years, months, days);
    date.setAttribute('min', minDate);

    let maxDate = checkDate(years, months, days + 16);
    date.setAttribute('max', maxDate);

})