// openweather key 
const API_KEY= 'ed82de601bf7486257ec4ba33019b41e'
const BASE_URL=`https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`

//To recieve the output in the console:
//cityWeather("Amsterdam").then(temp => console.log(temp)).catch(error => console.error(error));

function cityWeather(city) {
    return new Promise((resolve, reject) => {
        
        // case 1: not a string
        if (typeof city !== "string") {
            reject('not a string');
            return;
        }

        // case 2: string empty
        if (!city.trim()) {
            reject('string is empty');
            return;
        }

        const url = BASE_URL + `&q=` + city;
        
        axios.get(url)
            .then(response => {
                resolve(response.data.main.temp);  // resolve with the temperature data
            })
            .catch(error => {
                if (error.response.status === 404) {
                    reject('city not found'); // case 3: reject if city is not found
                } else {
                    reject(error.message);   // reject with general error message
                }
            });
    });
}

