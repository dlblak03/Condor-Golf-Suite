import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private poolData = {
    UserPoolId: environment.cognitoUserPoolId,
    ClientId: environment.cognitoAppClientId
  };

  private userPool = new CognitoUserPool(this.poolData);

  private cognitoUser: any = null;

  private statusCode = 0;

  private name = '';

  constructor() { }

  setUserData(username: string) {
    let userData = { Username: username, Pool: this.userPool };

    this.cognitoUser = new CognitoUser(userData);
  }

  getCognitoUser() {
    return this.cognitoUser;
  }

  setCognitoUser(cognitoUser: any) {
    this.cognitoUser = cognitoUser;
  }

  isLoggedIn(): boolean {
    var isAuth = false;

    let authenticatedUser = this.userPool.getCurrentUser();

    if (authenticatedUser != null) {
      authenticatedUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuth = session.isValid();
      })
    }
    return isAuth;
  }

  logOut() {
    let authenticatedUser = this.userPool.getCurrentUser();
    authenticatedUser?.signOut();
  }

  setName(name: string) {
    this.name = name;

    localStorage.setItem('authenticated_name', name);
  }

  getName() {
    return localStorage.getItem('authenticated_name');
  }
}
