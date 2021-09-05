import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  name = 'Test User';
  course_name = 'The Crossings Golf Club';
  status = 'Active';

  home = true;
  teesheet = false;
  players = false;
  reports = false;
  members = false;
  events = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeMenu(id: string) {
    this.home = false;
    this.teesheet = false;
    this.players = false;
    this.reports = false;
    this.members = false;
    this.events = false;

    switch(id) {
      case 'home':
        this.home = true;
        console.log('ran');
        break;
      case 'teesheet':
        this.teesheet = true;
        break;
      case 'players':
        this.players = true;
        break;
      case 'reports':
        this.reports = true;
        break;
      case 'members':
        this.members = true;
        break;
      case 'events':
        this.events = true;
        break;
    }

    console.log(this.home);
  }

}
