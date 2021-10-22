import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId
  };

  userPool = new CognitoUserPool(this.poolData);

  cognitoUser: any = null;

  passwordTemp = "";

  hide = true;
  loading = false;
  incorrectUP = false;
  updatePassword = false;

  more = false;
  number =false;
  special = false;
  uppercase = false;
  lowercase = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  signIn(login: NgForm) {
      try {
        this.loading = true;

        let authenticationDetails = new AuthenticationDetails({
          Username: login.value.username,
          Password: login.value.password,
        });

        let userData = { Username: login.value.username, Pool: this.userPool };

        this.cognitoUser = new CognitoUser(userData);

        this.cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result: any) => {
            this.loading = false;
            this.router.navigate(["dashboard"])

          },
          onFailure: (err: any) => {
            this.loading = false;
            this.incorrectUP = false;
            console.log(err.message);
            if(err.message.indexOf("Incorrect username or password.") != -1) {
              this.incorrectUP = true;
            }
            else if(err.message.indexOf("callback.newPasswordRequired") != -1) {
              this.updatePassword = true;
              this.passwordTemp = login.value.username;
            }
          },
        });

      } catch (error) {
          console.log('error signing in', error);
      }
  }

  validatePassword(validate: NgForm) {
    if(validate.value.newpassword.length > 8) {
      this.more = true;
    }
    else {
      this.more = false;
    }

    if(/\d/.test(validate.value.newpassword)) {
      this.number = true;
    }
    else {
      this.number = false;
    }

    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(validate.value.newpassword)) {
      this.special = true;
    }
    else {
      this.special = false;
    }

    if(/[A-Z]/.test(validate.value.newpassword)) {
      this.uppercase = true;
    }
    else {
      this.uppercase = false;
    }

    if(/[a-z]/.test(validate.value.newpassword)) {
      this.lowercase = true;
    }
    else {
      this.lowercase = false;
    }
  }

  changePW(changePassword: NgForm) {
    try {
      let userAttributes = {
        address: 'Test Address 123',
        name: 'Test Name',
        phone_number: '+15555555555'
      }
      this.cognitoUser.completeNewPasswordChallenge(changePassword.value.newpassword, userAttributes, {
         onSuccess: (result: any) => {
           this.loading = false;
           this.router.navigate(["dashboard"])

         },
         onFailure: (err: any) => {
           this.loading = false;
           console.log(err);
         }
     });
    }
    catch (error) {
        console.log('error changing password', error);
    }
  }

  goto(page: string) {
    this.router.navigate([page]);
  }

}
