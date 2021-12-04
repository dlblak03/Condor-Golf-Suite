import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/auth/auth-user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEventComponent } from '../../dialogs/add-event/add-event.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditEventComponent } from '../../dialogs/edit-event/edit-event.component';

export interface Event {
  eventid: string;
  name: string;
  type: string;
  playercount: string;
  date: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  durationInSeconds = 2;

  displayedColumns: string[] = ['eventid', 'name', 'type', 'playercount', 'date', 'delete'];
  dataSource = new ExampleDataSource([]);
  events: Event[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient, private authUser: AuthUserService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sortTable();
  }

  async sortTable() {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    await this.http.get<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/events', { headers })
            .toPromise()
            .then(data => {
              this.events.splice(0, this.events.length);
              data.Items.forEach((element: any) => {
                this.events.push({eventid: element.eventid, name: element.name, type: element.type, playercount: element.playercount, date: element.date})
              });
              this.dataSource = new ExampleDataSource(this.events);
              this.dataSource.paginator = this.paginator;
              console.log(this.events);
            });
  }

  openAddEvent(): void {
    this.dialog.open(AddEventComponent, {
      width: '325px'
    });
  }

  async deleteEvent(eventid: any) {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    const body = { eventid: eventid };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/events/delete', body, { headers })
            .subscribe(data => {
              if(data == '200') {
                this.dialog.closeAll();
                this.snackBar.open("Successfully Deleted Event", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['green-snackbar']
                });

                for(var i = 0; i < this.events.length; i++) {
                  var event = this.events[i];
                  if(event.eventid == eventid) {
                    var index = this.events.indexOf(event);
                    this.events.splice(index, 1);
                  }
                }
                this.dataSource.setData(this.events);
              }
              else {
                this.dialog.closeAll();
                this.snackBar.open("Could Not Delete Event", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['red-snackbar']
                });
              }
            });
  }

  editEvent(row: any) {
    const dialogRef = this.dialog.open(EditEventComponent, {
      width: '250px',
      data: {eventid: row.eventid, name: row.name, type: row.type, playercount: row.playercount, date: row.date},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

class ExampleDataSource extends DataSource<Event> {
  private _dataStream = new ReplaySubject<Event[]>();
  paginator: MatPaginator | undefined;

  constructor(initialData: Event[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Event[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Event[]) {
    this._dataStream.next(data);
  }
}
