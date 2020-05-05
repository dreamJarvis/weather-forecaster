window.addEventListener('load', ()=>{
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let description = document.querySelector('.temperature-description');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/842bf414934b236d63d810d1201dd860/${lat}, ${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data=>{
              console.log(data);  
              const {temperature, summary, icon} = data.currently;

                // set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                description.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Formula for celcius
                let celcius = (temperature - 32)*(5/9);

                // set icon 
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to Celcius/Farenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = celcius.toFixed(2);
                    }else{
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                });
            })
        });
    }

    function setIcons(icon, iconIdD){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconIdD, Skycons[currentIcon]);
    }
});