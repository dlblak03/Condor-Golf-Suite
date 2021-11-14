import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from "../../auth/auth-user.service";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  constructor(private http: HttpClient, private authUser: AuthUserService) { }

  ngOnInit(): void {
  }

  addPlayer():void {
    const headers = { 'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'http://localhost:4200',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
    'Authorization': 'Bearer ' + this.authUser.getJwtToken()
   };
   console.log(headers);
    const body = { name: 'Test Player', email: 'test@test.com', phone: '555-555-5555' };
    this.http.put<any>('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players', body, { headers })
            .subscribe(data => console.log(data));
  }

}
