document.getElementById('check').addEventListener('click', function (e) {
    e.preventDefault();
    const data = getWeather();
    data.then(value => {
        const cityname = value.list[0].name;
        const temperature = value.list[0].main["temp"];
        const humidity = value.list[0].main["humidity"];
        const description = value.list[0].weather[0].description;
        const icon = value.list[0].weather[0].icon;
        const iconurl = `//openweathermap.org/img/w/${icon}.png`;

        console.log(description);
        document.getElementById('icon').src = iconurl;
        document.getElementById('temp').innerHTML = temperature;
        document.getElementById('humidity').innerHTML = humidity;
        document.getElementById('description').innerHTML = description;
    })
});

async function getWeather() {
    const location = document.getElementById('location');
    const name = location.value;
    const weather = await fetch(`//api.openweathermap.org/data/2.5/find?q=${name}&units=metric&APPID=7fcd9306a86e57865a6611fbe671a97e`);
    const weatherjson = await weather.json();
    console.log(weatherjson);
    return weatherjson;
}

