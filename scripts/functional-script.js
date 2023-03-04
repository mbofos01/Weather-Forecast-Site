const form = document.getElementById('formIn');
const address = document.getElementById('AddressInput');
const region = document.getElementById('RegionInput');
const city = document.getElementById('CitySelection');
const country = document.getElementById('CountrySelection');
const log_btn = document.getElementById('logbtn');

const reset = document.getElementById('reset');
const map_cont = document.getElementById('blue');
var city_name;
var map_switch = 0;
var tab_switch = 0;
var info_switch = 0;
var card_available = 1;
var log_switch = 0;
var temp_value = 'metric';

function checkMessageAndVariables(message, variable) {
    var undef;
    if (variable === undef) {
        return 'N.A.';
    } else {
        return message;
    }
}

$(document).ready(function () {
    $(".radio").change(function () {

        var val = $('.radio:checked').val();
        temp_value = val;
    });
});

function onFormSubmit(event) {
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        form.classList.remove('needs-validation');
    } else {
        event.preventDefault();
        /**
         * first we have to create the dynamic results call the API etc
         */
        var xhr = new XMLHttpRequest();
        // Setup our listener to process completed requests
        xhr.onreadystatechange = function () {
            // Only run if the request is complete
            if (xhr.readyState !== 4) return;
            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                if (JSON.parse(xhr.responseText).length === 0) {
                    alert("No results found");
                    return;
                }
                resetExtraTabs();
                // What to do when the request is successful
                let lat = JSON.parse(xhr.responseText)[0]['lat'];
                let lon = JSON.parse(xhr.responseText)[0]['lon'];

                callOpenWeather(lat, lon);
                callOpenWeatherForecast(lat, lon);
                addMap(lat, lon);
                fetchCapital(country.value);
                fetchCountryInfo();



                sendData(address.value, region.value, city.value, country.value);
                document.getElementById('extraWindow').classList.remove('hidden');

                map_switch = 1;
            } else {
                // What to do when the request has failed
                console.log('error', xhr);
            }
        };
        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        let url = 'https://nominatim.openstreetmap.org/search?q=';
        url += address.value;
        url += ',';
        url += region.value;
        url += ',';
        url += city.value;
        url += '&format=json';
        xhr.open('GET', url);
        xhr.send();

        console.log(country.value + " " + city.value + " " + address.value + " " + region.value + " " + temp_value);
    }

}

form.addEventListener('submit', onFormSubmit);


function addMap(lat, lon) {
    if (map_switch == 1) {
        map_switch = 0;
        console.log('remove map');
        map_cont.removeChild(document.getElementById('map'));
        var dv = document.createElement('div');
        dv.id = 'map';
        dv.classList.add('map');
        map_cont.appendChild(dv);
        /*
        <div id="map" class="map"></div>*/
    }
    var map = new ol.Map({ // a map object is created
        target: 'map', // the id of the div in html to contain the map
        layers: [ // list of layers available in the map
            new ol.layer.Tile({ // first and only layer is the OpenStreetMap tiled layer
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({ // view allows to specify center, resolution, rotation of the map
            center: ol.proj.fromLonLat([lon, lat]), // center of the map
            zoom: 5 // zoom level (0 = zoomed out)
        })


    });
    layer_temp = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=3030488c6de74d04fd43e9054f2e385a',
        })
    });
    map.addLayer(layer_temp); // a temp layer on map
    layer_temp2 = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=3030488c6de74d04fd43e9054f2e385a',
        })
    });
    map.addLayer(layer_temp2); // a precipitation_new layer on map
}

function callOpenWeather(lat, lon) {
    var xhr2 = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr2.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr2.readyState !== 4) return;
        // Process our return data
        if (xhr2.status >= 200 && xhr2.status < 300) {

            addValuesRightNow(JSON.parse(xhr2.responseText));


        } else {
            // What to do when the request has failed
            console.log('error', xhr2);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    //https://api.openweathermap.org/data/2.5/weather?lat=35.1463009&lon=33.4079103 & units = metric & APPID = {YOUR_APP_ID


    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=';
    url += lat;
    url += '&lon=';
    url += lon;
    url += '&units=';
    url += temp_value;
    url += '&APPID=';
    url += '3030488c6de74d04fd43e9054f2e385a';
    xhr.open('GET', url);
    xhr.send();

    xhr2.open('GET', url);
    xhr2.send();


}

function callOpenWeatherForecast(lat, lon) {
    var xhr2 = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr2.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr2.readyState !== 4) return;
        // Process our return data
        if (xhr2.status >= 200 && xhr2.status < 300) {
            addValuesNext24Hours(JSON.parse(xhr2.responseText));

        } else {
            // What to do when the request has failed
            console.log('error', xhr2);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    //https://api.openweathermap.org/data/2.5/weather?lat=35.1463009&lon=33.4079103 & units = metric & APPID = {YOUR_APP_ID


    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
    url += lat;
    url += '&lon=';
    url += lon;
    url += '&units=';
    url += temp_value;
    url += '&APPID=';
    url += '3030488c6de74d04fd43e9054f2e385a';
    xhr.open('GET', url);
    xhr.send();

    xhr2.open('GET', url);
    xhr2.send();
}

function addValuesNext24Hours(response) {
    var table = document.getElementById("next_24_table").getElementsByTagName('tbody')[0];
    if (tab_switch == 1) {
        let bodyy = document.getElementById("next_24_table");
        bodyy.removeChild(document.getElementById('next_24_table_body'));
        var body1 = document.createElement('tbody');
        body1.id = 'next_24_table_body';
        bodyy.appendChild(body1);
        tab_switch = 0;
    }
    var table = document.getElementById("next_24_table").getElementsByTagName('tbody')[0];
    for (let i = 0; i <= 8; i++) {
        var row = table.insertRow();
        let this_hour = response['list'][i];
        let time = this_hour['dt'];
        let sum_pic = this_hour['weather'][0]['icon'];
        let temp = this_hour['main']['temp'];
        let cloud_cover = this_hour['clouds']['all'];
        let details_humidity = this_hour['main']['humidity'];
        let details_pressure = this_hour['main']['pressure'];
        let details_wind = this_hour['wind']['speed'];
        let details_description = this_hour['weather'][0]['description'];
        let details_main_description = this_hour['weather'][0]['main'];
        let details_city = response['city']['name'];


        var cell1 = row.insertCell(0);
        let str1 = "";
        if (new Date(time * 1000).getHours() <= 9) {
            str1 += "0";
        }
        let str2 = "";
        if (new Date(time * 1000).getMinutes() <= 9) {
            str2 += "0";
        }
        cell1.classList.add('central');
        cell1.textContent = checkMessageAndVariables(str1 + new Date(time * 1000).getHours() + ":" + str2 + new Date(time * 1000).getMinutes(), time);

        var cell2 = row.insertCell(1);
        cell2.classList.add('central');
        img_url = "https://openweathermap.org/img/w/";
        img_url += sum_pic;
        img_url += '.png';


        let icon_weather = document.createElement('img');
        icon_weather.src = img_url;
        icon_weather.alt = "Weather Icon";
        icon_weather.height = 42;
        icon_weather.width = 42;
        cell2.appendChild(icon_weather);


        var cell3 = row.insertCell(2);
        cell3.classList.add('central');
        let si = "";
        if (temp_value === 'metric') {
            si = "C";
        } else {
            si = "F";
        }
        cell3.textContent = checkMessageAndVariables(temp + "°" + si, temp);

        var cell4 = row.insertCell(3);
        cell4.classList.add('central');
        cell4.textContent = checkMessageAndVariables(cloud_cover + " %", cloud_cover);



        var cell5 = row.insertCell(4);
        cell5.classList.add('central');
        let btn = document.createElement("button");
        btn.title = "open details view";
        btn.type = "button";
        btn.classList.add("btn");
        btn.classList.add("btn-success");
        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#exampleModalGrid2");
        let ps;
        if (temp_value === 'metric') {
            si = "meters/sec";
            ps = "hPa";
        } else {
            si = "miles/hour";
            ps = "Mb";
        }

        btn.onclick = function () {
            let date_variable = new Date(time * 1000);
            document.getElementById('insert_date').textContent = checkMessageAndVariables(date_variable.getDate() + " " + decodeMonth(date_variable.getMonth()) + " " + date_variable.getFullYear() + " " + str1 + date_variable.getHours() + ":" + str2 + date_variable.getMinutes(), date_variable);
            let det_img_url = "https://openweathermap.org/img/w/";
            det_img_url += sum_pic;
            det_img_url += '.png';
            /*  inner html */
            document.getElementById('iconimage').innerHTML = '<img src="' + det_img_url + '" alt="Smiley face" height="42" width="42">';
            document.getElementById('insert_city').textContent = checkMessageAndVariables(details_city, details_city);

            document.getElementById('weatinfo').textContent = checkMessageAndVariables(details_main_description, details_main_description) + ' ' + checkMessageAndVariables('(' + details_description + ')', details_description);
            document.getElementById('humi').textContent = checkMessageAndVariables(details_humidity + " %", details_humidity);
            document.getElementById('pres').textContent = checkMessageAndVariables(details_pressure + " " + ps, details_pressure);
            document.getElementById('wspe').textContent = checkMessageAndVariables(details_wind + " " + si, details_wind);
        };
        btn.textContent = "View";
        cell5.appendChild(btn);
    }
    tab_switch = 1;

}

function decodeDay(day) {
    if (day === 0) {
        return "Sunday";
    }
    if (day === 1) {
        return "Monday";
    }
    if (day === 2) {
        return "Tuesday";
    }
    if (day === 3) {
        return "Wednesday";
    }
    if (day === 4) {
        return "Thursday";
    }
    if (day === 5) {
        return "Friday";
    }
    if (day === 6) {
        return "Saturday";
    }
    return "error";
}

function decodeMonth(month) {
    if (month === 0)
        return "Jan";
    if (month === 1)
        return "Feb";
    if (month === 2)
        return "Mar";
    if (month === 3)
        return "Apr";
    if (month === 4)
        return "May";
    if (month === 5)
        return "Jun";
    if (month === 6)
        return "Jul";
    if (month === 7)
        return "Aug";
    if (month === 8)
        return "Sep";
    if (month === 9)
        return "Oct";
    if (month === 10)
        return "Nov";
    if (month === 11)
        return "Dec";
    return "error";
}

function addValuesRightNow(response) {
    const icon_pic = document.getElementById('icon');

    img_url = "https://openweathermap.org/img/w/";
    img_url += response['weather'][0]['icon'];
    img_url += '.png';
    icon_pic.src = img_url;

    const title_weath = document.getElementById('weather_description');
    title_weath.textContent = response['weather'][0]['description'] + " in " + response['name'];
    const temp_weath = document.getElementById('temperature');
    let si = "";
    let pre_si = "";
    let temp_si = "";

    if (temp_value === 'metric') {
        temp_si = "C";
        si = "meters/sec";
        pre_si = "hPa";
    } else {
        temp_si = "F";
        si = "miles/hour";
        pre_si = "Mb";
    }
    temp_weath.textContent = checkMessageAndVariables(response['main']['temp'] + "°" + temp_si, response['main']['temp']);

    const low_temp = document.getElementById('low');
    low_temp.textContent = checkMessageAndVariables(response['main']['temp_min'] + "°" + temp_si, response['main']['temp_min']);
    const high_temp = document.getElementById('high');
    high_temp.textContent = checkMessageAndVariables(response['main']['temp_max'] + "°" + temp_si, response['main']['temp_max']);

    const pressure = document.getElementById('pressure');
    pressure.textContent = checkMessageAndVariables(response['main']['pressure'] + " " + pre_si, response['main']['pressure']);

    const humidity = document.getElementById('humidity');
    humidity.textContent = checkMessageAndVariables(response['main']['humidity'] + " %", response['main']['humidity']);


    const wind = document.getElementById('windspeed');
    wind.textContent = checkMessageAndVariables(response['wind']['speed'] + " " + si, response['wind']['speed']);

    const clouds = document.getElementById('cloudcover');
    clouds.textContent = checkMessageAndVariables(response['clouds']['all'] + " %", response['clouds']['all']);

    const sunrise = document.getElementById('sunrise');
    let str1 = "";
    if (new Date(response['sys']['sunrise'] * 1000).getHours() <= 9) {
        str1 += "0";
    }
    let str2 = "";
    if (new Date(response['sys']['sunrise'] * 1000).getMinutes() <= 9) {
        str2 += "0";
    }
    sunrise.textContent = checkMessageAndVariables(str1 + new Date(response['sys']['sunrise'] * 1000).getHours() + ":" + str2 + new Date(response['sys']['sunrise'] * 1000).getMinutes(), response['sys']['sunrise']);

    str1 = "";
    if (new Date(response['sys']['sunset'] * 1000).getHours() <= 9) {
        str1 += "0";
    }
    str2 = "";
    if (new Date(response['sys']['sunset'] * 1000).getMinutes() <= 9) {
        str2 += "0";
    }
    const sunset = document.getElementById('sunset');
    sunset.textContent = checkMessageAndVariables(str1 + new Date(response['sys']['sunset'] * 1000).getHours() + ":" + str2 + new Date(response['sys']['sunset'] * 1000).getMinutes(), response['sys']['sunset']);

}

function resetExtraTabs() {
    document.getElementById('rightnow').classList.add('active');
    document.getElementById('rightnow').classList.add('show');

    document.getElementById('nexthours').classList.remove('show');
    document.getElementById('nexthours').classList.remove('active');

    document.getElementById('general').classList.remove('show');
    document.getElementById('general').classList.remove('active');

    document.getElementById('right_now_tab').classList.add('active');
    document.getElementById('next_24_tab').classList.remove('active');
    document.getElementById('general_tab').classList.remove('active');

}

function onFormReset(event) {
    if (document.getElementById('extraWindow').classList.contains('hidden') === false)
        document.getElementById('extraWindow').classList.add('hidden')

    resetExtraTabs();
    form.classList.remove('was-validated');
    form.classList.add('needs-validation');
    temp_value = 'metric';

    getCities();

}

reset.addEventListener('click', onFormReset);


/*

*/

var xhr = new XMLHttpRequest();
// Setup our listener to process completed requests
xhr.onreadystatechange = function () {
    // Only run if the request is complete
    if (xhr.readyState !== 4) return;
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
        // What to do when the request is successful
        let country1 = JSON.parse(xhr.responseText)['data'];
        for (let name in country1) {
            if (country1[name]['country'] === 'Cyprus' && asdasfnd === 0) {

            } else {
                var opt = document.createElement('option');
                opt.value = country1[name]['country'];
                opt.textContent = country1[name]['country'];
                country.appendChild(opt);



            }
        }

    } else {
        // What to do when the request has failed
        console.log('error', xhr);
    }
};
// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://countriesnow.space/api/v0.1/countries');
xhr.send();

var asdasfnd = 0;

function getCities() {
    var options = city.getElementsByTagName('OPTION');
    if (asdasfnd !== 0) {
        for (let i = 0; i < city.options.length; i++) {
            city.removeChild(options[i]);
            i--; // options have now less element, then decrease i
        }
        var opt = document.createElement('option');
        opt.setAttribute('disabled', 'disabled');
        opt.setAttribute('selected', 'selected');
        opt.setAttribute('value', '');
        opt.textContent = "Select city";
        city.appendChild(opt);
    }
    asdasfnd = 1;
    var xhr1 = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr1.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr1.readyState !== 4) return;
        // Process our return data
        if (xhr1.status >= 200 && xhr1.status < 300) {
            // What to do when the request is successful
            let cityy = JSON.parse(xhr1.responseText)['data'];
            for (let name in cityy) {
                if (cityy[name]['country'] === country.options[country.selectedIndex].value) {
                    for (let c in cityy[name]['cities']) {
                        var opt = document.createElement('option');
                        opt.value = cityy[name]['cities'][c];
                        opt.textContent = cityy[name]['cities'][c];
                        city.appendChild(opt);
                    }

                }
            }

        } else {
            // What to do when the request has failed
            console.log('error', xhr1);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr1.open('GET', 'https://countriesnow.space/api/v0.1/countries');
    xhr1.send();


}

getCities();

function capitalNameGenerator(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}


function fetchCapital(country_name) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What to do when the request is successful
            let data = JSON.parse(xhr.responseText);
            for (let pointer of data['data']) {

                if (pointer['name'] == country_name) {
                    let name = pointer['capital'];
                    fetchImage(name.toLowerCase());
                }
            }
        } else {
            // What to do when the request has failed
            console.log('error', xhr);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', 'https://countriesnow.space/api/v0.1/countries/capital');
    xhr.send();

}


function fetchFlag(country_name) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What to do when the request is successful
            let data = JSON.parse(xhr.responseText);
            for (let pointer of data['data']) {

                if (pointer['name'] == country_name) {
                    let imagee = pointer['flag'];
                    document.getElementById('insert_capital_flag').src = imagee;
                }
            }
        } else {
            // What to do when the request has failed
            console.log('error', xhr);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', 'https://countriesnow.space/api/v0.1/countries/flag/images');
    xhr.send();

}

function fetchImage(city_name) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What to do when the request is successful
            if (card_available == 0) {
                document.getElementById('card_holder').classList.add('col-xl-6');
                document.getElementById('card_holder').classList.add('col-12');
                document.getElementById('card_holder').classList.remove('hidden');
                card_available = 1;
                document.getElementById('not_card_holder').classList.add('col-xl-6');
                document.getElementById('not_card_holder').classList.remove('col-xl-12');
            }
            let data = JSON.parse(xhr.responseText);
            document.getElementById('insert_capital').src = data['photos']['0']['image']['mobile'];
            document.getElementById('insert_capital_title').textContent = capitalNameGenerator(city_name);
            fetchFlag(country.value);


        } else {
            // What to do when the request has failed
            //console.log('error', xhr);
            removeCard();

        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', 'https://api.teleport.org/api/urban_areas/slug:' + city_name.toLowerCase() + '/images');
    xhr.send();

}

function removeCard() {
    document.getElementById('card_holder').classList.add('hidden');
    document.getElementById('card_holder').classList.remove('col-xl-6');
    document.getElementById('card_holder').classList.remove('col-12');
    card_available = 0;
    document.getElementById('not_card_holder').classList.remove('col-xl-6');
    document.getElementById('not_card_holder').classList.add('col-xl-12');
}

function fetchCountryInfo() {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();
    // Setup our listener to process completed requests
    xhr.onreadystatechange = function () {
        // Only run if the request is complete
        if (xhr.readyState !== 4) return;
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What to do when the request is successful
            let data = JSON.parse(xhr.responseText);
            var paragraph = document.getElementById("insert_capital_info");
            var text = document.createTextNode("This just got added");

            if (info_switch === 1 && card_available === 1) {
                document.getElementById('insert_capital_info').remove();

            }
            if (card_available === 1) {
                const para = document.createElement("p");
                para.classList.add("card-text");
                para.classList.add("lflow");
                para.classList.add('bold');
                para.setAttribute('id', 'insert_capital_info');
                const node = document.createTextNode(data['0']['capital'] + " is the capital of " + country.value + '. ' +
                    country.value + ' is located at ' + data['0']['region'] + '.');
                para.appendChild(node);
                const element = document.getElementById("card-body");
                element.appendChild(para);
                info_switch = 1;
            }
            document.getElementById('info_title').textContent = "Information About " + country.value;
            document.getElementById('ctr').textContent = country.value;
            document.getElementById('gdp').textContent = checkMessageAndVariables(data['0']['gdp'], data['0']['gdp']);
            /*  inner html */
            document.getElementById('surarea').innerHTML = checkMessageAndVariables(data['0']['surface_area'] / 1000 + " km<sup>2</sup>", data['0']['surface_area']);
            document.getElementById('forarea').textContent = checkMessageAndVariables(data['0']['forested_area'] + " %", data['0']['forested_area']);
            document.getElementById('curr').textContent = checkMessageAndVariables(data['0']['currency']['code'], data['0']['currency']['code']);
            document.getElementById('popu').textContent = checkMessageAndVariables(data['0']['population'] / 1000 + " millions", data['0']['population']);
            /*  inner html */
            document.getElementById('popden').innerHTML = checkMessageAndVariables(data['0']['pop_density'] + " per km<sup>2</sup>", data['0']['pop_density']);
            document.getElementById('intus').textContent = checkMessageAndVariables(data['0']['internet_users'] + " %", data['0']['internet_users']);
            /*  inner html */
            document.getElementById('co2').innerHTML = checkMessageAndVariables(data['0']['co2_emissions'] + ' tCO<sub>2</sub>/km<sup>2</sup>/yr', data['0']['co2_emissions']);
            document.getElementById('tspec').textContent = checkMessageAndVariables(data['0']['threatened_species'], data['0']['threatened_species']);
            document.getElementById('mall').textContent = checkMessageAndVariables(data['0']['life_expectancy_male'] + " years old", data['0']['life_expectancy_male']);
            document.getElementById('fmall').textContent = checkMessageAndVariables(data['0']['life_expectancy_female'] + " years old", data['0']['life_expectancy_female']);




        } else {
            // What to do when the request has failed
            console.log('error', xhr);
        }
    };
    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', 'https://api.api-ninjas.com/v1/country?name=' + country.value);
    xhr.setRequestHeader("X-Api-Key", 'q/CjLuVLML3TCrIrQXaQaQ==wmC9i6uWv0Ua3WwK');
    xhr.send();

}


function sendData(address, region, city, country) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {} else {
            console.log('error', xhr);
        }
    };
    xhr.open('POST', './php/sql_communication.php');
    xhr.setRequestHeader("Content-Type", "application/json");
    const data = {};
    data.username = 'mbofos01';
    data.address = address;
    data.region = region;
    data.city = city;
    data.country = country;
    //xhr.send(JSON.stringify(data));

}

function formatDate(unix_date) {

    let date = new Date(unix_date * 1000);

    let str1 = "";
    if (date.getHours() <= 9) {
        str1 += "0";
    }
    let str2 = "";
    if (date.getMinutes() <= 9) {
        str2 += "0";
    }
    return date.getDate() + " " + decodeMonth(date.getMonth()) + " " + date.getFullYear() + " " + str1 + date.getHours() + ":" + str2 + date.getMinutes();

}

function getLast() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            let values = JSON.parse(xhr.responseText);
            if (log_switch == 1) {
                let bodyy = document.getElementById("last_five_table");
                bodyy.removeChild(document.getElementById('last_five_body'));
                let body1 = document.createElement('tbody');
                body1.id = 'last_five_body';
                bodyy.appendChild(body1);
                log_switch = 0;
            }
            let table = document.getElementById("last_five_table").getElementsByTagName('tbody')[0];
            for (let i = 5; i > 0; i--) {
                let line = values[i];
                var row = table.insertRow();

                var cell1 = row.insertCell(0);
                cell1.classList.add('central');
                cell1.textContent = checkMessageAndVariables(formatDate(line['2']), line['2']);

                var cell2 = row.insertCell(1);
                cell2.classList.add('central');
                cell2.textContent = checkMessageAndVariables(line['3'], line['3']);


                var cell3 = row.insertCell(2);
                cell3.classList.add('central');
                cell3.textContent = checkMessageAndVariables(line['4'], line['4']);

                var cell4 = row.insertCell(3);
                cell4.classList.add('central');
                cell4.textContent = checkMessageAndVariables(line['5'], line['5']);

                var cell5 = row.insertCell(4);
                cell5.classList.add('central');
                cell5.textContent = checkMessageAndVariables(line['6'], line['6']);

            }
            log_switch = 1;
        } else {
            console.log('error', xhr);
        }
    };
    xhr.open('GET', './php/sql_communication.php?how_many=5&username=mbofos01');
    //xhr.send();

}


log_btn.addEventListener("click", getLast);