import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/loginUser';
import { Observable } from 'rxjs';
import { ServiceResult } from 'src/app/models/serviceResult';
import { ExternalLoginUser } from 'src/app/models/externalLoginUser';

@Injectable()
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path = "http://localhost:5000/api/auth-service/auth/login";
  externalpath = "http://localhost:5000/api/auth-service/auth/externallogin";
  userToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) : Observable<ServiceResult> {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient.post<ServiceResult>(this.path, loginUser, { headers: headers });
  }

  externalLogin(externalLoginUser:ExternalLoginUser){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient.post<ServiceResult>(this.externalpath, externalLoginUser, { headers: headers });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY)
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getCurrentUserId() {
    return this.jwtHelper.decodeToken(this.token).aud;
  }

}
