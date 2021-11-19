import { Component, OnInit } from '@angular/core';

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

  displayedColumns: string[] = ['position', 'name', 'email', 'phone'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  getAllPlayers() {
    fetch('https://kw31bx8r49.execute-api.us-east-1.amazonaws.com/players')
    .then(response=>response.json())
    .then(data=>{});
  }

}
