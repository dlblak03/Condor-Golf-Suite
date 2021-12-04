import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from "../../auth/auth-user.service";
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../../snackbars//success/success.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  durationInSeconds = 2;

  constructor(private http: HttpClient, private authUser: AuthUserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addEvent(user: NgForm):void {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    const body = { name: user.value.name, type: user.value.type, playercount: user.value.playercount, date: user.value.date };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/events', body, { headers })
            .subscribe(data => {
              if(data == '200') {
                this.dialog.closeAll();
                this.snackBar.open("Successfully Added Event", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['green-snackbar']
                });
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

}
