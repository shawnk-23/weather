//get data from openweather
async function getWeather2(){
    try {
        let cityCheck = document.getElementById("cityname").value;
        let trimmedC = cityCheck.replace(/\s+/g,'');
        let myurl = '';

        if (/^\d+$/.test(trimmedC)){
        
                myurl = `https://api.openweathermap.org/data/2.5/forecast/daily?zip=${cityCheck}&cnt=5&appid=eecec2717dd473b53436bc81df4f7dff`     
        }else if (/^[a-zA-Z]+$/.test(trimmedC)){
                myurl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityCheck}&units=metric&cnt=5&appid=eecec2717dd473b53436bc81df4f7dff`     
        }else {
                throw new Error('Invalid City or Zip');
        }
        const res = await fetch(myurl);
        const data = await res.json();
        showweather2(data);
        document.getElementById('err').textContent = '';
    }catch(error){
        document.getElementById('err').textContent = error;
    }
}


function showweather2(data){
    // console.log(data);

    document.getElementById("type").textContent = `Next 4 Days of  ${data.city.name}` 
    document.getElementById('row').innerHTML= 
    data.list.map((day,i) => {
        if (i > 0){
            // console.log('day2:',day)
            let d = new Date(day.dt * 1000).toDateString()
            
            let d2 = new Date(day.sunrise * 1000).toLocaleString("en-US",{
                timeZone: "America/Los_Angeles"
                })
            let d3 = new Date(day.sunset * 1000).toLocaleString("en-US",{
                timeZone: "America/Los_Angeles"
                })
            
            
            return `<div class="col-sm p-3">
            <div class="card" style="width:22rem">
            <h5 class="card-title p-2">${d}</h5>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" class="card-img-top" alt="${day.weather[0].description}"/>
            <div class="card-body">
                <h3 class="card-title">${day.weather[0].main}</h3>
                <p class="card-text">High ${convertTemp(day.temp.max)} Low ${convertTemp(day.temp.min)}</p>
                <p class="card-text">High Feels like ${convertTemp(day.feels_like.day)}</p>
                <p class="card-text">Pressure ${day.pressure}mb</p>
                <p class="card-text">Humidity ${day.humidity}%</p>
                <p class="card-text">Wind ${day.speed}m/s</p>
                <p class="card-text">Sunrise ${d2}</p>
                <p class="card-text">Sunset ${d3}</p>
            </div>
            </div>
            </div>
            `
        }
    })

}

function convertTemp(K){
K = parseInt(K);
let F = (K - 273.15) * 9/5 + 32;
F = Math.floor(F);
return F+`&deg;F`;
}
