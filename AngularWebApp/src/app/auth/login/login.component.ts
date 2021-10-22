import { Component, OnInit } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { AuthUserService } from "../auth-user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cognitoUser: any = null;

  hide = true;
  loading = false;
  incorrectUP = false;
  updatePassword = false;

  more = false;
  number = false;
  special = false;
  uppercase = false;
  lowercase = false;
  policyPW = false;

  constructor(private router: Router, private authUser: AuthUserService ) {

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

    this.authUser.setUserData(login.value.username);

    this.cognitoUser = this.authUser.getCognitoUser();

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        this.loading = false;
        this.authUser.setCognitoUser(this.cognitoUser);
        this.cognitoUser.getUserAttributes((err: any, result: any) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          this.authUser.setName(result[3].getValue());
          this.router.navigate(["dashboard"]);
        });
      },
      onFailure: (err: any) => {
        this.loading = false;
        this.incorrectUP = false;
        if (err.message.indexOf("Incorrect username or password.") != -1) {
          this.incorrectUP = true;
        }
      },
      newPasswordRequired: (result: any) => {
        this.loading = false;
        this.incorrectUP = false;
        this.updatePassword = true;
        this.authUser.setCognitoUser(this.cognitoUser);
        this.cognitoUser.getUserAttributes((err: any, result: any) => {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          this.authUser.setName(result[3].getValue());
        });
      }
    });

  } catch (error) {
    console.log('error signing in', error);
  }
}

validatePassword(validate: NgForm) {
  if (validate.value.newpassword.length > 8) {
    this.more = true;
  }
  else {
    this.more = false;
  }

  if (/\d/.test(validate.value.newpassword)) {
    this.number = true;
  }
  else {
    this.number = false;
  }

  let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(validate.value.newpassword)) {
    this.special = true;
  }
  else {
    this.special = false;
  }

  if (/[A-Z]/.test(validate.value.newpassword)) {
    this.uppercase = true;
  }
  else {
    this.uppercase = false;
  }

  if (/[a-z]/.test(validate.value.newpassword)) {
    this.lowercase = true;
  }
  else {
    this.lowercase = false;
  }
}

newPwChallange(changePassword: NgForm) {
  try {
    this.loading = true;

    let userAttributes = {
      address: 'Test Address 123',
      name: 'Test Name',
      phone_number: '+15555555555'
    }

    this.cognitoUser.completeNewPasswordChallenge(changePassword.value.newpassword, userAttributes, {
      onSuccess: (result: any) => {
        this.loading = false;
        this.policyPW = false;
        this.authUser.setCognitoUser(this.cognitoUser);
        this.router.navigate(["dashboard"]);
      },
      onFailure: (err: any) => {
        if(err.message.indexOf("Password does not conform to policy: Password not long enough") != -1) {
          this.loading = false;
          this.policyPW = true;
        }
      }
    });
  }
  catch (error) {
    console.log('error changing password', error);
  }
}

}
