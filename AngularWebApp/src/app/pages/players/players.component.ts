import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

export interface Player {
  playerid: string;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  displayedColumns: string[] = ['playerid', 'name', 'email', 'phone'];
  dataSource = new ExampleDataSource([]);
  sorter: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  players: Player[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient, private authUser: AuthUserService) { }

  ngOnInit(): void {
    this.sortTable('A');
  }

  getAllPlayers() {
    fetch('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players')
    .then(response=>response.json())
    .then(data=>{});
  }

  async sortTable(value: any) {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    await this.http.get<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players/all/' + value, { headers })
            .toPromise()
            .then(data => {
              this.players.splice(0, this.players.length);
              data.Items.forEach((element: any) => {
                this.players.push({playerid: element.playerid, name: element.name, email: element.email, phone: element.phone})
              });
              this.dataSource = new ExampleDataSource(this.players);
              this.dataSource.paginator = this.paginator;
              console.log(this.players);
            });
  }

}

class ExampleDataSource extends DataSource<Player> {
  private _dataStream = new ReplaySubject<Player[]>();
  paginator: MatPaginator | undefined;

  constructor(initialData: Player[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Player[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Player[]) {
    this._dataStream.next(data);
  }
}
