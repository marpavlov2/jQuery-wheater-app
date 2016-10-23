var key = "9e82599b6df0867a29231961b303c97f",
	loca = "Varazdin,hr"


$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+loca+"&units=metric&APPID="+key, function (data) {
	$('span#current-temp').html(Math.round(data.main.temp));
	$('span#current-humi').html(data.main.humidity);
});

var weatherData = [];
$.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+loca+"&units=metric&cnt=5&APPID="+key, function (data) {
	weatherData = data.list;
	renderData(weatherData);

});

function renderData(data) {
	var weatherItems = [];
	$.each(data, function (index, element) {
		weatherItems += '<article class="weatherItem">'+
							'<span class="weatherIcon"><img src="http://openweathermap.org/img/w/'+element.weather[0].icon+'.png" alt=""></span>'+
							'<span class="weatherTitle">'+element.weather[0].description+'</span>'+
							'<span class="temp-max"> Max: '+Math.round(element.temp.max)+'°C</span>'+
							'<span class="temp-min">  Min: '+Math.round(element.temp.min)+'°C</span>'+
							'<span class="weather-date">'+formatDate(element.dt)+'</span>'+
						'</article>';


	});

	$('div#weather').html(weatherItems)
};

function formatDate(dat) {
	var date = new Date(dat*1000);
	var weekday = ["Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
	var month = date.getMonth() + 1;
	return weekday[date.getDay()] + ", " + date.getDate() + "." + month;
};