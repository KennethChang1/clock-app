'use strict';

const btn = document.querySelector('.btn');
const section = document.querySelector('.section--top');
const btnLess = document.getElementById('btn-less');
const btnMore = document.getElementById('btn-more');
const quoteWrapper = document.querySelector('.quote-wrapper');

btn.addEventListener('click', () => {
    section.classList.toggle('section-expand');
    btnLess.classList.toggle('not-active');
    btnMore.classList.toggle('not-active');
    quoteWrapper.classList.toggle('quote-wrapper-active');
})


fetch("https://worldtimeapi.org/api/ip")
    .then((res) => res.json())
    .then((data) => {
        getLocation(data);
        updateTime(data);
        updateStat(data);
    })


function getLocation(loc){
    fetch(`http://ip-api.com/json/${loc.client_ip}`)
    .then((res) => res.json())
    .then((data) => {
        updateLocation(data);
    })
}

fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
        displayQuote(data);
    })

function updateTime(data) {
    const cardTime = document.querySelector('.card__time');
    const arraySplit = data.datetime.split('T');
    const time = arraySplit[1].split(':');
    const day = document.querySelector('.day');
    const headerLogo = document.querySelector('.header-logo');
    const section = document.querySelector('.section');

    cardTime.innerHTML = `${time[0]}:${time[1]} <span class="card__time-zone">${data.abbreviation}</span>`;

    if (time[0] > 12 && time[0] < 24) {
        day.textContent = "GOOD EVENING";
        headerLogo.setAttribute('src', 'assets/desktop/icon-moon.svg');
        section.style.cssText = 'background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("assets/mobile/bg-image-nighttime.jpg");'
    } else {
        day.textContent = "GOOD MORNING";
        headerLogo.setAttribute('src', 'assets/desktop/icon-sun.svg');
        section.style.cssText = 'background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("assets/mobile/bg-image-daytime.jpg");'
    }
}

function updateLocation(data) {
    const location = document.querySelector('.card__location');

    location.textContent = `IN ${data.city}, ${data.country}`;
}

function updateStat(data) {
    const timezone = document.getElementById('timezone');
    const doy = document.getElementById('doy');
    const dow = document.getElementById('dow');
    const weekNumber = document.getElementById('week-number');
    timezone.textContent = data.timezone;
    doy.textContent = data.day_of_year;
    dow.textContent = data.day_of_week;
    weekNumber.textContent = data.week_number;
}

function displayQuote(data) {
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    quote.textContent = data.content;
    author.textContent = data.author;
}

setInterval(function () {
    fetch("https://worldtimeapi.org/api/ip")
        .then((res) => res.json())
        .then((data) => {
            updateTime(data);
        })
}, 1000);