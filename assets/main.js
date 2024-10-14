(async () => {
    const location = document.getElementById("location");
    const condition = document.getElementById("cond");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const desc = document.getElementById("desc");
    
    async function getData() {};
    function weatherCodeToImgSrc(code, hour) {};
    
    const currentHour = new Date().getHours();
    const data = await getData();
    
    const currentCond = data[0];
    const areaName = data[1][0];
    const country = data[1][1];
    
    location.textContent += `${areaName}, ${country}`;
    condition.setAttribute("src", weatherCodeToImgSrc(currentCond["weatherCode"], currentHour));
    condition.setAttribute("alt", currentCond["weatherDesc"][0].value);
    temp.innerHTML += `${currentCond["temp_C"]}&deg;C | ${currentCond["temp_F"]}&deg;F`;
    humidity.innerHTML += `${currentCond["humidity"]}%`;
    windSpeed.innerHTML += `${currentCond["windspeedKmph"]} km/h | ${currentCond["windspeedMiles"]} mph`;
    desc.innerHTML += currentCond["weatherDesc"][0].value;


    
    async function getData() {
        const response = await fetch("https://wttr.in/?format=j1");
        
        const data = await response.json();
        
        const currentCond = data["current_condition"][0];
        const nearestArea = data["nearest_area"][0];
        const areaName = nearestArea["areaName"][0].value;
        const country = nearestArea["country"][0].value;
        
        return [currentCond, [areaName, country]];
    };
    
    function weatherCodeToImgSrc(code, hour) {
        const imgsPath = "/assets/weather-imgs/";

        const isDaytime = (hour >= 6 && hour < 18) ? true : false;
        
        // Reference: https://www.worldweatheronline.com/feed/wwoConditionCodes.txt
        const wwoConditionCodes = {
            "113": {
                desc: "Clear",
                hasVariant: true,
                imgs: {
                    day: "clear-day.png",
                    night: "clear-night.png",
                }
            },

            "116": {
                desc: "Partly Cloudy",
                hasVariant: true,
                imgs: {
                    day: "partly-cloudy-day.png",
                    night: "partly-cloudy-night.png",
                }
            },

            "119": {
                desc: "Cloudy",
                hasVariant: true,
                imgs: {
                    day: "cloudy-day.png",
                    night: "cloudy-night.png",
                }
            },

            "122": {
                desc: "Overcast",
                hasVariant: false,
                imgs: "cloudy.png",
            },

            "143": {
                desc: "Mist",
                hasVariant: false,
                imgs: "fog.png",
            },

            "176": {
                desc: "Patchy rain nearby",
                hasVariant: true,
                imgs: {
                    day: "light-rain-day.png",
                    night: "light-rain-night.png",
                }
            },

            "179": {
                desc: "Patchy snow nearby",
                hasVariant: true,
                imgs: {
                    day: "light-snow-day.png",
                    night: "light-snow-night.png",
                }
            },

            "182": {
                desc: "Patchy sleet nearby",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "185": {
                desc: "Patchy freezing drizzle nearby",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "200": {
                desc: "Thundery outbreaks in nearby",
                hasVariant: true,
                imgs: {
                    day: "light-rain-thunder-day.png",
                    night: "light-rain-thunder-night.png",
                }
            },

            "227": {
                desc: "Blowing snow",
                hasVariant: true,
                imgs: {
                    day: "light-snow-day.png",
                    night: "light-snow-night.png",
                }
            },

            "230": {
                desc: "Blizzard",
                hasVariant: true,
                imgs: {
                    day: "heavy-snow-day.png",
                    night: "heavy-snow-night.png",
                }
            },

            "248": {
                desc: "Fog",
                hasVariant: false,
                imgs: "fog.png",
            },

            "260": {
                desc: "Freezing fog",
                hasVariant: false,
                imgs: "fog.png",
            },

            "263": {
                desc: "Patchy light drizzle",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "266": {
                desc: "Light drizzle",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "281": {
                desc: "Freezing drizzle",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "284": {
                desc: "Heavy freezing drizzle",
                hasVariant: true,
                imgs: {
                    day: "heavy-sleet-day.png",
                    night: "heavy-sleet-night.png",
                }
            },

            "293": {
                desc: "Patchy light rain",
                hasVariant: true,
                imgs: {
                    day: "light-rain-day.png",
                    night: "light-rain-night.png",
                }
            },

            "296": {
                desc: "Light rain",
                hasVariant: true,
                imgs: {
                    day: "light-rain-day.png",
                    night: "light-rain-night.png",
                }
            },

            "299": {
                desc: "Moderate rain at times",
                hasVariant: true,
                imgs: {
                    day: "moderate-rain-day.png",
                    night: "moderate-rain-night.png",
                }
            },

            "302": {
                desc: "Moderate rain",
                hasVariant: true,
                imgs: {
                    day: "moderate-rain-day.png",
                    night: "moderate-rain-night.png",
                }
            },

            "305": {
                desc: "Heavy rain at times",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-day.png",
                    night: "heavy-rain-night.png",
                }
            },

            "308": {
                desc: "Heavy rain",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-day.png",
                    night: "heavy-rain-night.png",
                }
            },

            "311": {
                desc: "Light freezing rain",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "314": {
                desc: "Moderate or Heavy freezing rain",
                hasVariant: true,
                imgs: {
                    day: "heavy-sleet-day.png",
                    night: "heavy-sleet-night.png",
                }
            },

            "317": {
                desc: "Light sleet",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "320": {
                desc: "Moderate or heavy sleet",
                hasVariant: true,
                imgs: {
                    day: "heavy-sleet-day.png",
                    night: "heavy-sleet-night.png",
                }
            },

            "323": {
                desc: "Patchy light snow",
                hasVariant: true,
                imgs: {
                    day: "light-snow-day.png",
                    night: "light-snow-night.png",
                }
            },

            "326": {
                desc: "Light snow",
                hasVariant: true,
                imgs: {
                    day: "light-snow-day.png",
                    night: "light-snow-night.png",
                }
            },

            "329": {
                desc: "Patchy moderate snow",
                hasVariant: true,
                imgs: {
                    day: "moderate-snow-day.png",
                    night: "moderate-snow-night.png",
                }
            },

            "332": {
                desc: "Moderate snow",
                hasVariant: true,
                imgs: {
                    day: "moderate-snow-day.png",
                    night: "moderate-snow-night.png",
                }
            },

            "335": {
                desc: "Patchy heavy snow",
                hasVariant: true,
                imgs: {
                    day: "heavy-snow-day.png",
                    night: "heavy-snow-night.png",
                }
            },

            "338": {
                desc: "Heavy snow",
                hasVariant: true,
                imgs: {
                    day: "heavy-snow-day.png",
                    night: "heavy-snow-night.png",
                }
            },

            "350": {
                desc: "Ice pellets",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "353": {
                desc: "Light rain shower",
                hasVariant: true,
                imgs: {
                    day: "light-rain-day.png",
                    night: "light-rain-night.png",
                }
            },

            "356": {
                desc: "Moderate or heavy rain shower",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-day.png",
                    night: "heavy-rain-night.png",
                }
            },

            "359": {
                desc: "Torrential rain shower",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-day.png",
                    night: "heavy-rain-night.png",
                }
            },

            "362": {
                desc: "Light sleet showers",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "365": {
                desc: "Moderate or heavy sleet showers",
                hasVariant: true,
                imgs: {
                    day: "heavy-sleet-day.png",
                    night: "heavy-sleet-night.png",
                }
            },

            "368": {
                desc: "Light snow showers",
                hasVariant: true,
                imgs: {
                    day: "light-snow-day.png",
                    night: "light-snow-night.png",
                }
            },

            "371": {
                desc: "Moderate or heavy snow showers",
                hasVariant: true,
                imgs: {
                    day: "heavy-snow-day.png",
                    night: "heavy-snow-night.png",
                }
            },

            "374": {
                desc: "Light showers of ice pellets",
                hasVariant: true,
                imgs: {
                    day: "light-sleet-day.png",
                    night: "light-sleet-night.png",
                }
            },

            "377": {
                desc: "Moderate or heavy showers of ice pellets",
                hasVariant: true,
                imgs: {
                    day: "heavy-sleet-day.png",
                    night: "heavy-sleet-night.png",
                }
            },

            "386": {
                desc: "Patchy light rain in area with thunder",
                hasVariant: true,
                imgs: {
                    day: "light-rain-thunder-day.png",
                    night: "light-rain-thunder-night.png",
                }
            },

            "389": {
                desc: "Moderate or heavy rain in area with thunder",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-thunder-day.png",
                    night: "heavy-rain-thunder-night.png",
                }
            },

            "392": {
                desc: "Patchy light snow in area with thunder",
                hasVariant: true,
                imgs: {
                    day: "light-snow-thunder-day.png",
                    night: "light-snow-thunder-night.png",
                }
            },

            "395": {
                desc: "Moderate or heavy snow in area with thunder",
                hasVariant: true,
                imgs: {
                    day: "heavy-rain-thunder-day.png",
                    night: "heavy-rain-thunder-night.png",
                }
            },
        };

        if (Object.hasOwn(wwoConditionCodes, code)) {
            const condition = wwoConditionCodes[code];

            if (condition.hasVariant) {
                return isDaytime ? imgsPath + condition.imgs.day : imgsPath + condition.imgs.night;
            } else {
                return imgsPath + condition.imgs;
            };
        };
    };
})();