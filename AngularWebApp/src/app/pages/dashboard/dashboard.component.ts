import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPlayerComponent } from '../../dialogs/add-player/add-player.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  WeatherDataCurrent: any = {
    temp_celcius : 0
  };
  FutureTemp: any;

  cloudy: any;
  rainy_current: any;
  units: any = true;

  load: any = true;

  playerCount: any;

  loadedData: any = false;

  futureForecast: any = new Array();

  constructor(private http: HttpClient, public dialog: MatDialog, private dash: DashboardService) { }

  async ngOnInit() {
    if(!this.dash.loadedData()) {
      await this.dash.loadPlayerCount();

      this.dash.getWeatherData()
      .then(response => {
          this.WeatherDataCurrent = response[0];
          this.futureForecast = response[1];
          this.load = false;
          this.loadedData = true;
          this.dash.loadedData();
          this.playerCount = this.dash.getPlayerCount();
        }
      );
    }
    else {
      this.WeatherDataCurrent = this.dash.getWeatherObjects()[0];
      this.futureForecast = this.dash.getWeatherObjects()[1];
      this.playerCount = this.dash.getPlayerCount();
      this.load = false;
    }
  }

  openDialog(): void {
    this.dialog.open(AddPlayerComponent, {
      width: '325px'
    });
  }
}
