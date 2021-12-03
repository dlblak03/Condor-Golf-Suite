import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from "../../auth/auth-user.service";
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../../snackbars//success/success.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  playerid: string;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  durationInSeconds = 2;
  selectedVal: any = "";

  constructor(private http: HttpClient, private authUser: AuthUserService, private dialog: MatDialog, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  updatePlayer(user: NgForm):void {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    const body = { playerid: user.value.playerid, name: user.value.name, email: user.value.email, phone: user.value.phone, sort: user.value.name.charAt(0) };
    this.selectedVal = user.value.name.charAt(0);
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players/update', body, { headers })
            .subscribe(data => {
              if(data == '200') {
                this.dialog.closeAll();
                this.snackBar.open("Successfully Updated Player", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['green-snackbar']
                });
              }
              else {
                this.dialog.closeAll();
                this.snackBar.open("Could Not Update Player", "Okay", {
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['red-snackbar']
                });
              }
            });
  }

}
