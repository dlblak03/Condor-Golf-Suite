import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPlayerComponent } from '../../dialogs/add-player/add-player.component';

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

  load: any = true;

  futureForecast: any = new Array();

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  async ngOnInit() {
    this.getWeatherData();
    await this.sleep(500);
    this.load = false;
  }

  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=louisville&appid=0c27bfb17162df596beb01d7f2b5cf65')
    .then(response=>response.json())
    .then(data=>{this.setWeatherDataCurrent(data);});

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=38.2527&lon=-85.7585&exclude=current,minutely,hourly,alerts&appid=0c27bfb17162df596beb01d7f2b5cf65')
    .then(response=>response.json())
    .then(data=>{this.setFutureWeatherData(data);});
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

    if(this.WeatherDataCurrent.description.toLowerCase().indexOf("rain") >= 0 || this.WeatherDataCurrent.description.toLowerCase().indexOf("mist") >= 0) {
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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[0].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[1].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[2].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[3].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[4].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[5].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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
      temp_min_fahrenheit: '',
      temp_max_fahrenheit: '',
      description: this.FutureTemp.daily[6].weather[0].description,
      rainy: false,
      cloudy: false
   }

   temp.temp_min_fahrenheit = ((Number(temp.temp_min_celcius) * (9/5)) + 32).toFixed(0);
   temp.temp_max_fahrenheit = ((Number(temp.temp_max_celcius) * (9/5)) + 32).toFixed(0);

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

  sleep(ms: any) {
   return new Promise((resolve) => {
     setTimeout(resolve, ms);
   });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '325px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createPlayer() {
    const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization' };
    const body = { name: 'Test Player', email: 'test@test.com', phone: '555-555-5555' };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players', body, { headers })
            .subscribe(data => console.log(data));
  }
}
