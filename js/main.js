let search = document.querySelector('.search');
let city = document.querySelector('.content .city');
let country = document.querySelector('.content .country');
let times = document.querySelector('.times');
let temperative = document.querySelector('.temperative');
let climate = document.querySelector('.short-desc');
let more = document.querySelector('.more-desc');
let eye = document.querySelector('.more-desc .visibility .eye');
let wind = document.querySelector('.more-desc .visibility .wind');
let sun = document.querySelector('.more-desc .visibility .sun');

let content = document.querySelector('.content')
let weather = document.querySelector('#weather')
let body = document.querySelector('body')

async function changeWeatherUI(input) {
    let timeNow = new Date()
    let apiWeather = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=922c91f957fc61f34686a4c67f19d55b`;
    let data = await fetch(apiWeather).then(response => response.json());
    console.log(data)

    if (data.cod == 200) {
        content.classList.remove('hide')
        times.classList.remove('hide')
        temperative.classList.remove('hide')
        climate.classList.remove('hide')
        more.classList.remove('hide')

        let temper = Math.round((data.main.temp - 273.15))
        city.innerText = data.name
        country.innerText = data.sys.country
        times.innerText = timeNow;
        temperative.innerHTML = `<span class="value">${temper}<suP>o</suP>C</span>`
        climate.innerText = data.weather[0].main;
        eye.innerText = data.main.humidity + '%';
        wind.innerText = data.wind + 'm/s'
        sun.innerText = data.main.pressure + 'Pa';

        if (temper > 25) {
            body.classList.remove('cold')
            weather.classList.remove('cold')
            body.classList.add('hot')
            weather.classList.add('hot')

        } else {
            body.classList.remove('hot')
            weather.classList.remove('hot')
            body.classList.add('cold')
            weather.classList.add('cold')
        }

    } else {
        content.classList.add('hide')
        times.classList.add('hide')
        temperative.classList.add('hide')
        climate.classList.add('hide')
        more.classList.add('hide')
    }
}


search.addEventListener('keypress', function (e) {
    e.defaultPrevented
    if (e.code == 'Enter') {
        let capitalSearch = search.value.trim()
        changeWeatherUI(capitalSearch);
    }

})
