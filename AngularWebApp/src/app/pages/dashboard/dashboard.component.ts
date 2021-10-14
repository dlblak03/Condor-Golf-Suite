import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  WeatherDataCurrent: any;
  FutureTemp: any;

  cloudy: any;
  rainy_current: any;
  units: any = true;

  futureForecast: any = new Array();

  constructor() { }

  ngOnInit() {
    this.getWeatherData();
    console.log(this.WeatherDataCurrent);
  }

  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=louisville&appid=0c27bfb17162df596beb01d7f2b5cf65')
    .then(response=>response.json())
    .then(data=>{this.setWeatherDataCurrent(data);})

    let temp = JSON.parse('{"lat":38.3287,"lon":-85.7648,"timezone":"America/Kentucky/Louisville","timezone_offset":-14400,"daily":[{"dt":1634230800,"sunrise":1634212261,"sunset":1634252797,"moonrise":1634243460,"moonset":1634189040,"moon_phase":0.3,"temp":{"day":300.55,"min":292.72,"max":300.93,"night":295.18,"eve":298.46,"morn":293.02},"feels_like":{"day":302.11,"night":295.53,"eve":298.8,"morn":293.6},"pressure":1014,"humidity":64,"dew_point":293.14,"wind_speed":3.38,"wind_deg":207,"wind_gust":10.34,"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"clouds":41,"pop":0.07,"uvi":4.88},{"dt":1634317200,"sunrise":1634298720,"sunset":1634339111,"moonrise":1634332020,"moonset":1634279520,"moon_phase":0.34,"temp":{"day":296.69,"min":288.13,"max":297.66,"night":288.13,"eve":294.47,"morn":292.68},"feels_like":{"day":297.21,"night":288.16,"eve":295.11,"morn":292.99},"pressure":1011,"humidity":81,"dew_point":293.14,"wind_speed":5.39,"wind_deg":333,"wind_gust":11.63,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":29,"pop":1,"rain":9.49,"uvi":2.99},{"dt":1634403600,"sunrise":1634385179,"sunset":1634425427,"moonrise":1634420220,"moonset":1634370000,"moon_phase":0.37,"temp":{"day":288.98,"min":283.18,"max":289.81,"night":283.18,"eve":286.56,"morn":284.79},"feels_like":{"day":287.64,"night":281.86,"eve":285.31,"morn":284.18},"pressure":1018,"humidity":39,"dew_point":275.13,"wind_speed":6.3,"wind_deg":310,"wind_gust":12.06,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":26,"pop":1,"rain":5.6,"uvi":3.99},{"dt":1634490000,"sunrise":1634471638,"sunset":1634511743,"moonrise":1634508240,"moonset":1634460240,"moon_phase":0.4,"temp":{"day":290.24,"min":280.08,"max":290.58,"night":284.21,"eve":285.67,"morn":280.28},"feels_like":{"day":288.89,"night":282.83,"eve":284.39,"morn":278.92},"pressure":1023,"humidity":34,"dew_point":274.29,"wind_speed":3.66,"wind_deg":288,"wind_gust":8.77,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":0,"pop":0,"uvi":4.02},{"dt":1634576400,"sunrise":1634558097,"sunset":1634598060,"moonrise":1634596080,"moonset":1634550420,"moon_phase":0.44,"temp":{"day":292.7,"min":281.66,"max":293.49,"night":286.49,"eve":288.43,"morn":281.66},"feels_like":{"day":291.81,"night":285.68,"eve":287.61,"morn":280.71},"pressure":1020,"humidity":42,"dew_point":279.31,"wind_speed":3.43,"wind_deg":241,"wind_gust":5.36,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":0,"pop":0,"uvi":3.92},{"dt":1634662800,"sunrise":1634644557,"sunset":1634684378,"moonrise":1634683920,"moonset":1634640480,"moon_phase":0.47,"temp":{"day":293.39,"min":283.62,"max":294.44,"night":287.45,"eve":289.62,"morn":283.62},"feels_like":{"day":292.67,"night":286.82,"eve":288.94,"morn":282.79},"pressure":1020,"humidity":46,"dew_point":281.14,"wind_speed":2.67,"wind_deg":228,"wind_gust":5.14,"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"clouds":79,"pop":0,"uvi":4},{"dt":1634749200,"sunrise":1634731018,"sunset":1634770698,"moonrise":1634771760,"moonset":1634730540,"moon_phase":0.5,"temp":{"day":294.79,"min":284.04,"max":295.47,"night":288.18,"eve":290.21,"morn":284.04},"feels_like":{"day":294.08,"night":287.59,"eve":289.54,"morn":283.22},"pressure":1022,"humidity":41,"dew_point":280.76,"wind_speed":2.73,"wind_deg":214,"wind_gust":3.92,"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":2,"pop":0,"uvi":4},{"dt":1634835600,"sunrise":1634817479,"sunset":1634857018,"moonrise":1634859720,"moonset":1634820540,"moon_phase":0.53,"temp":{"day":293.59,"min":285.53,"max":293.59,"night":287.22,"eve":289.52,"morn":285.53},"feels_like":{"day":293.15,"night":286.85,"eve":289.67,"morn":284.94},"pressure":1016,"humidity":56,"dew_point":284.39,"wind_speed":5.02,"wind_deg":215,"wind_gust":11.2,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":99,"pop":0.99,"rain":1.73,"uvi":4}]}');
    console.log(temp);
    this.setFutureWeatherData(temp);

    // let data = JSON.parse('{"coord":{"lon":-85.7594,"lat":38.2542},"weather":[{"id":804,"main":"Overcast Clouds","description":"Clouds","icon":"04d"}],"base":"stations","main":{"temp":298.82,"feels_like":298.67,"temp_min":296.52,"temp_max":300.31,"pressure":1019,"humidity":47},"visibility":10000,"wind":{"speed":0,"deg":0},"clouds":{"all":90},"dt":1631299129,"sys":{"type":2,"id":2010269,"country":"US","sunrise":1631272844,"sunset":1631318366},"timezone":-14400,"id":4299276,"name":"Louisville","cod":200}');
    // this.setWeatherDataCurrent(data);
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

    this.WeatherDataCurrent.temp_fahrenheit = ((this.WeatherDataCurrent.temp_celcius * (9/5)) + 32).toFixed(0);
    this.WeatherDataCurrent.temp_min_fahrenheit = ((this.WeatherDataCurrent.temp_min_celcius * (9/5)) + 32).toFixed(0);
    this.WeatherDataCurrent.temp_max_fahrenheit = ((this.WeatherDataCurrent.temp_max_celcius * (9/5)) + 32).toFixed(0);
    this.WeatherDataCurrent.temp_feels_fahrenheit = ((this.WeatherDataCurrent.temp_feels_celcius * (9/5)) + 32).toFixed(0);

    this.WeatherDataCurrent.humidity = this.WeatherDataCurrent.main.humidity;
    this.WeatherDataCurrent.wind = (this.WeatherDataCurrent.wind.speed * 2.23694).toFixed(2);

    this.WeatherDataCurrent.day = currentDate.toLocaleDateString('en-us', { weekday: 'long' });
    this.WeatherDataCurrent.time = this.roundToHour(currentDate).toLocaleTimeString('en-us', {hour: 'numeric', minute:'2-digit'});
    this.WeatherDataCurrent.description = this.WeatherDataCurrent.weather[0].description;
    if(this.WeatherDataCurrent.description.toLowerCase().indexOf("cloud") >= 0) {
      this.cloudy = true;
    }
    else {
      this.cloudy = false;
    }

    if(this.WeatherDataCurrent.description.toLowerCase().indexOf("rain") >= 0) {
      this.rainy_current = true;
      this.cloudy = false;
    }
    else {
      this.rainy_current = false;
    }
  }

  setFutureWeatherData(data: any) {
    this.FutureTemp = data;

    let currentDate: Date = new Date();

    let temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[0].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[0].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[0].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[1].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[1].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[1].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[2].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[2].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[2].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[3].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[3].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[3].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[4].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[4].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[4].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[5].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[5].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[5].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    currentDate.setDate(currentDate.getDate() + 1);
    temp = {
      day: this.getShortDay(currentDate.toLocaleDateString('en-us', { weekday: 'long' })),
      temp_min_celcius: (this.FutureTemp.daily[6].temp.min - 273.15).toFixed(0),
      temp_max_celcius: (this.FutureTemp.daily[6].temp.max - 273.15).toFixed(0),
      description: this.FutureTemp.daily[6].weather[0].description,
      rainy: false,
      cloudy: false
   }
   if(temp.description.toLowerCase().indexOf("cloud") >= 0) {
     temp.cloudy = true;
   }
   else {
     temp.cloudy = false;
   }

   if(temp.description.toLowerCase().indexOf("rain") >= 0) {
     temp.rainy = true;
     temp.cloudy = false;
   }
   else {
     temp.rainy = false;
   }
    this.futureForecast.push(temp);

    console.log(this.futureForecast);
  }

  roundToHour(date: Date) {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.round(date.getTime() / p) * p);
  }

  getShortDay(day: String) {
    switch(day) {
      case "Monday":
        return "Mon";
      case "Tuesday":
        return "Tue";
      case "Wednesday":
        return "Wed";
      case "Thursday":
        return "Thu";
      case "Friday":
        return "Fri";
      case "Saturday":
        return "Sat";
      case "Sunday":
        return "Sun";
      default:
        return "";
    }
  }

}
