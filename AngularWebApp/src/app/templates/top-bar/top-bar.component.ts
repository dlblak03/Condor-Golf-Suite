import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  name = 'John Smith';
  course_name = 'The Crossings Golf Club';
  status = 'Active';

  constructor() { }

  ngOnInit(): void {
  }

}
