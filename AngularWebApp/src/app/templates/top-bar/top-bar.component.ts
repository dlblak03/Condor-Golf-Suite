import { Component, OnInit } from '@angular/core';
import { AuthUserService } from "../../auth/auth-user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  name = 'John Smith';
  course_name = 'The Crossings Golf Club';
  status = 'Active';

  constructor(private authService: AuthUserService, private router: Router) { }

  ngOnInit(): void {
    this.name = this.authService.getName();
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(["login"]);
  }

}
