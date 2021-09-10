import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  WeatherData: any;
  constructor() { }

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData() {
    let data = JSON.parse('{"coord":{"lon":-85.7594,"lat":38.2542},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":297.24,"feels_like":296.91,"temp_min":295.41,"temp_max":298.18,"pressure":1014,"humidity":46},"visibility":10000,"wind":{"speed":0.89,"deg":322,"gust":1.34},"clouds":{"all":59},"dt":1631228338,"sys":{"type":2,"id":2009252,"country":"US","sunrise":1631186393,"sunset":1631232060},"timezone":-14400,"id":4299276,"name":"Louisville","cod":200}');
    this.setWeatherData(data);
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentData = new Date();
    this.WeatherData.isDay = (currentData.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    this.WeatherData.humidity = this.WeatherData.main.humidity;
  }

}
