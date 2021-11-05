import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

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
