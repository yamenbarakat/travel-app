// check if the user put a value that consists from letters and more than one letter
const checkCity = (c) => {
    const cityVal = c;
    if (cityVal.match(/\d/) || (c.match(/^[A-Za-z]+$/) && c.length < 2)) {
        alert('Please enter a city');
        return false
    } else {
        return c
    }
}

export {checkCity}
