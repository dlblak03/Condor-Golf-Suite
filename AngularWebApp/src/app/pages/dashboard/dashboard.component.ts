import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  WeatherDataCurrent: any;
  WeatherDataHourly: any;

  constructor() { }

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherDataCurrent);
  }

  getWeatherData() {
    // fetch('https://api.openweathermap.org/data/2.5/weather?q=louisville&appid=0c27bfb17162df596beb01d7f2b5cf65')
    // .then(response=>response.json())
    // .then(data=>{this.setWeatherDataCurrent(data);})

    let data = JSON.parse('{"coord":{"lon":-85.7594,"lat":38.2542},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":298.82,"feels_like":298.67,"temp_min":296.52,"temp_max":300.31,"pressure":1019,"humidity":47},"visibility":10000,"wind":{"speed":0,"deg":0},"clouds":{"all":90},"dt":1631299129,"sys":{"type":2,"id":2010269,"country":"US","sunrise":1631272844,"sunset":1631318366},"timezone":-14400,"id":4299276,"name":"Louisville","cod":200}');
    this.setWeatherDataCurrent(data);
  }

  setWeatherDataCurrent(data: any) {
    this.WeatherDataCurrent = data;
    let sunsetTime = new Date(this.WeatherDataCurrent.sys.sunset * 1000);
    this.WeatherDataCurrent.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate: Date = new Date();
    this.WeatherDataCurrent.isDay = (currentDate.getTime() < sunsetTime.getTime());

    this.WeatherDataCurrent.temp_celcius = (this.WeatherDataCurrent.main.temp - 273.15).toFixed(0);
    this.WeatherDataCurrent.temp_min_celcius = (this.WeatherDataCurrent.main.temp_min - 273.15).toFixed(0);
    this.WeatherDataCurrent.temp_max_celcius = (this.WeatherDataCurrent.main.temp_max - 273.15).toFixed(0);
    this.WeatherDataCurrent.temp_feels_celcius = (this.WeatherDataCurrent.main.feels_like - 273.15).toFixed(0);

    this.WeatherDataCurrent.temp_fahrenheit = (this.WeatherDataCurrent.temp_celcius * (9/5)) + 32;
    this.WeatherDataCurrent.temp_min_fahrenheit = (this.WeatherDataCurrent.temp_min_celcius * (9/5)) + 32;
    this.WeatherDataCurrent.temp_max_fahrenheit = (this.WeatherDataCurrent.temp_max_celcius * (9/5)) + 32;
    this.WeatherDataCurrent.temp_feels_fahrenheit = (this.WeatherDataCurrent.temp_feels_celcius * (9/5)) + 32;

    this.WeatherDataCurrent.humidity = this.WeatherDataCurrent.main.humidity;
    this.WeatherDataCurrent.wind = (this.WeatherDataCurrent.wind.speed * 2.23694).toFixed(2);

    this.WeatherDataCurrent.day = currentDate.toLocaleDateString('en-us', { weekday: 'long' });
    this.WeatherDataCurrent.time = this.roundToHour(currentDate).toLocaleTimeString('en-us', {hour: 'numeric', minute:'2-digit'});
    this.WeatherDataCurrent.description = this.WeatherDataCurrent.weather[0].description;
  }

  roundToHour(date: Date) {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
  }

}
