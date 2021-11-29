import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/auth/auth-user.service';


export interface PeriodicElement {
  name: string;
  position: number;
  email: string;
  phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Dalton Blake', email: 'test@test.com', phone: 'NA'},
];

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone'];
  dataSource = ELEMENT_DATA;
  sorter: any = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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
              console.log(data);
            });
  }

}
