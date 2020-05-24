import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from 'src/app/models/register';
import { ServiceResult } from 'src/app/models/serviceResult';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  path = "http://localhost:5000/api/auth-service/auth/register";

  register(registerUser: RegisterUser) : Observable<ServiceResult> {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.httpClient.post<ServiceResult>(this.path, registerUser, { headers: headers });
  }
}
