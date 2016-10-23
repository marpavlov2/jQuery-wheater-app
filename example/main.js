var key = "9e82599b6df0867a29231961b303c97f",
	loc = "Varazdin,hr";

// get and display current weather info
$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+loc+"&units=metric&APPID="+key, function (ma) {
	$('span#current-humid').html(ma.main.humidity);
	$('span#current-temp').html(Math.round(ma.main.temp));
});

// get forecast data and render template once data is fetched

	var weatherData = [];
	$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+loc+"&units=metric&cnt=5&APPID="+key, function (data) {
		weatherData = data.list;
		renderTemplate(weatherData);
	});


function formatDate(d) {
	var date = new Date(d*1000);
	var weekday = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota']
	var month = date.getMonth() + 1;
	return weekday[date.getDay()] + ", " + date.getDate() + "." + month;
};

// format template and render it within the #weather div element
function renderTemplate(data) {
	var weatherItems = [];
	$.each(data, function(index,item) {
		weatherItems += '<article class="weather-item">'+
							'<span class="weather-icon"><img src="http://openweathermap.org/img/w/'+item.weather[0].icon+'.png" alt=""></span>' +
							'<span class="weather-title">'+item.weather[0].description+'</span>'+
							'<span class="temp-max">Max: '+Math.round(item.temp.max)+'°C</span>'+
							'<span class="temp-min">Min: '+Math.round(item.temp.min)+'°C</span>'+
							'<span class="weather-date">'+formatDate(item.dt)+'</span>'+
						'</article>';
	});
	
	$('div#weather').html(weatherItems);
}



/*------- kad je novi red mora se spajat sa plusem-------*/