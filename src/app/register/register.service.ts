import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from 'node_modules/@angular/common/http';
import { catchError } from 'node_modules/rxjs/operators';
import { Observable, throwError } from 'node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiURL = "http://localhost:3333/ftr"
  constructor(private http: HttpClient) { }

  register(user :any): Observable<UserProfile>{
    console.log(user)
    return this.http.post<UserProfile>(this.apiURL + '/userProfile', user)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

}
interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: number;
  password: string;
  nationality: string;
  passportNumber: string;
  permanentAddress: string;
  officeAddress: string;
  personalIdentificationNumber: number;
}