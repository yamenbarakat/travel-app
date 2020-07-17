const date = document.getElementById('date');

// This file is for choosin date, it sets the current date as a minimum and add 16 to it as a maximum whenever the page loads 

// helper date function for checking the days if they are above the month's days
const checkDays = (m, d) => {
    // store days of months
    const dm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // store the max range of days
    let max = d + 16;
    // check the days of the month
    const checkMonth = dm[m-1];

    let update;

    // check which month the max days go above the month's days to update the date
    if (checkMonth === 31 && max > 31) {
        update = max - 31;
    } else if (checkMonth === 30 && max > 30) {
        update = max - 30;
    } else if (checkMonth === 28 && max > 28) {
        update = max - 28;
    } else {
        // if none of the above is true, then return the same month with the max days
    return [m, max]
    }

    m++
    d = update;
    return [m, d]
}

// helper date function for checking the months and days if they are less than 10
const isTen = (y, m, d) => {
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10)  {
        d = '0' + d
    }
    return [y, m, d].join('-')
}

// main date function
const dateUpdate = window.addEventListener('load', () => {
    // Create a new date instance
    const d = new Date();

    // make the date format to YYYY-MM-DD
    let years = d.getFullYear();
    let months = (d.getMonth() + 1);
    let days = d.getDate();

    // set the the current date as a minimum
    const minDate = isTen(years, months, days);
    date.setAttribute('min', minDate);

    // set the the current date with 16 days as a maximum
    const check = checkDays(months, days);
    const maxDate = isTen(years, check[0], check[1])
    date.setAttribute('max', maxDate);

})


export {dateUpdate}