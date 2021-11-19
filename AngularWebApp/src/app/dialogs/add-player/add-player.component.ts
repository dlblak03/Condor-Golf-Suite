import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from "../../auth/auth-user.service";
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  constructor(private http: HttpClient, private authUser: AuthUserService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addPlayer(user: NgForm):void {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com/',
      'Access-Control-Allow-Methods': 'http://localhost:4200, https://master.d4pza09saklb.amplifyapp.com/',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret',
      'Authorization': 'Bearer ' + this.authUser.getJwtToken()
     };
    const body = { name: user.value.name, email: user.value.email, phone: user.value.phone, sort: user.value.name.charAt(0) };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players', body, { headers })
            .subscribe(data => {
              if(data == '200') {
                this.dialog.closeAll();
              }
            });
  }

}
