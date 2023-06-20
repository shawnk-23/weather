//get data from openweather
async function getWeather(){
       try {
              let cityCheck = document.getElementById("cityname").value;
              let trimmedC = cityCheck.replace(/\s+/g,'');
              let myurl = '';

              if (/^\d+$/.test(trimmedC)){
                     myurl = `https://api.openweathermap.org/data/2.5/weather?zip=${cityCheck},us&appid=eecec2717dd473b53436bc81df4f7dff`     
              }else if (/^[a-zA-Z]+$/.test(trimmedC)){
                     myurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCheck}&appid=eecec2717dd473b53436bc81df4f7dff`     
              }else {
                     throw new Error('Invalid City or Zip');
              }

              const res = await fetch(myurl);
              const data = await res.json();
              showweather(data);
              document.getElementById('err').textContent = '';
       }catch(error){
              document.getElementById('err').textContent = error;
       }
}


function showweather(data){
       // console.log(data);
       let d = data.dt;
       let d2 = data.sys.sunrise;
       let d3 = data.sys.sunset;

       let date = new Date(d*1000)
       let date2 = new Date(d2*1000)
       let date3 = new Date(d3*1000)
       let pstDate1 = date2.toLocaleString("en-US",{
              timeZone: "America/Los_Angeles"
       })
       let pstDate2 = date3.toLocaleString("en-US",{
              timeZone: "America/Los_Angeles"
       })

       document.getElementById("type").textContent = `Current Weather of ${data.name}`
       document.getElementById('row').innerHTML= `<div class="col-sm p-3">
       <div class="card" style="width:22rem">
       <h5 id="date" class="card-title p-2">${date.toDateString()}</h5>
       <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" class="card-img-top" alt="${data.weather[0].description}"/>
       <div class="card-body">
       <h3 class="card-title">${data.weather[0].main} (${convertTemp(data.main.temp)})</h3>
       <p class="card-text">High ${convertTemp(data.main.temp_max)} Low ${convertTemp(data.main.temp_min)}</p>
       <p class="card-text">High Feels like ${convertTemp(data.main.feels_like)}</p>
       <p class="card-text">Pressure ${data.main.pressure}mb</p>
       <p class="card-text">Humidity ${data.main.humidity}%</p>
       <p class="card-text">Wind ${data.wind.speed}m/s, ${data.wind.deg}&deg;</p>
       <p class="card-text">Sunrise ${pstDate1}</p>
       <p class="card-text">Sunset ${pstDate2}</p>
       </div>
       </div>
       </div>`
}

function convertTemp(K){
K = parseInt(K);
let F = (K - 273.15) * 9/5 + 32;
F = Math.floor(F);
return F+`&deg;F`;
}
