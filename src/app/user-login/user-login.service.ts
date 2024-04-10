import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserLogin } from './UserLogin';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { AdminLogin } from '../admin-login/AdminLogin';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) {}

  login(data: UserLogin):  Observable<any> {
    localStorage.setItem('userId', data.userId.toString());
    return this.http.post("http://localhost:3333/ftr/userProfile/login",data,{responseType:'text' as 'json'});
  }
}



