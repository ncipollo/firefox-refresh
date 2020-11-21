console.log("loaded refresh plugin!")

if (isOutOfStock()) {
    console.log('out of stock!')
    if (shouldRefresh()) {
        console.log('going to refresh!')
        printTime()
        refresh()
    } else  {
        console.log("it's too late, refresh manually tomorrow!")
    }
} else {
    console.log('not out of stock!')
}

function isOutOfStock() {
    let elements = $('productHero-info').find('p:contains("Out of Stock")')
    return elements.length > 0
}

function shouldRefresh() {
    let hours = new Date().getHours()
    // Auto-refresh between 10AM and 8PM
    return hours >= 10 && hours <= 21
}

function refreshRate() {
    let minutes = new Date().getMinutes();

    if (minutes > 13 && minutes < 21) {
        return 30 * 1000 + fuzz();
    }
    return 5 * 60000 + fuzz()
}

function fuzz() {
    return  Math.floor((Math.random() * 10000));
}

function refresh() {
    let rate = refreshRate();
    printRefreshRate(rate)
    setTimeout(function () {
        window.location.reload(1);
    }, rate);
}

function printRefreshRate(time) {
    console.log(`Refreshing in ${time/1000} seconds`)
}

function printTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    var time = `${hours}:${minutes}`

    console.log(`It is currently ${time}`)
}