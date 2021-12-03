import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPlayerComponent } from '../../dialogs/add-player/add-player.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditPlayerComponent } from '../../dialogs/edit-player/edit-player.component';

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
  durationInSeconds = 2;
  selectedVal: any = "";

  displayedColumns: string[] = ['playerid', 'name', 'email', 'phone', 'delete'];
  dataSource = new ExampleDataSource([]);
  sorter: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  players: Player[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient, private authUser: AuthUserService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
     this.selectedVal = value;
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

  openAddPlayer(): void {
    this.dialog.open(AddPlayerComponent, {
      width: '325px'
    });
  }

  async deletePlayer(playerid: any, name: any) {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    const body = { playerid: playerid, sort: name[0] };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players/delete', body, { headers })
            .subscribe(data => {
              if(data == '200') {
                this.dialog.closeAll();
                this.snackBar.open("Successfully Deleted Player", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['green-snackbar']
                });

                for(var i = 0; i < this.players.length; i++) {
                  var player = this.players[i];
                  if(player.playerid == playerid) {
                    var index = this.players.indexOf(player);
                    this.players.splice(index, 1);
                  }
                }
                this.dataSource.setData(this.players);
              }
              else {
                this.dialog.closeAll();
                this.snackBar.open("Could Not Add Player", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['red-snackbar']
                });
              }
            });
  }

  editPlayer(row: any) {
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      width: '250px',
      data: {playerid: row.playerid, name: row.name, email: row.email, phone: row.phone},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
