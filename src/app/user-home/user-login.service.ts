import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient) { }

  postLogin(login: Login): Observable<any> {
    return this.http.post('http://localhost:3333/ftr/userProfile/login', login, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    )
  }

  coachId!: number;

  getProfileByUserId(): Observable<UserProfile> {
    this.coachId = Number.parseInt(localStorage.getItem('userId') || '');
    return this.http.get<UserProfile>('http://localhost:3333/ftr/userProfile/' + this.coachId).pipe(
      tap(data => { console.log('dataFetched:' + JSON.stringify(data)) }),
      catchError(this.handleError));
  }

  updateProfileByUserId(userUpdateData: UpdateProfile): Observable<any> {
    this.coachId = Number.parseInt(localStorage.getItem('userId')|| '');
    return this.http.put<any>('http://localhost:3333/ftr/userProfile/' + this.coachId, userUpdateData).pipe(
      tap(data => console.log('dataFetched for update:' + data)),
      catchError(this.handleError));
  }
  deleteProfileByUserId(): Observable<any> {
    this.coachId = Number.parseInt(localStorage.getItem('userId')|| '');
    return this.http.delete('http://localhost:3333/ftr/userProfile/' + this.coachId).pipe(
      tap((data) => { console.log('dataFetched for remove:' + data) }), catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    let errMsg: string = '';
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    }
    else {
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }
}

interface UpdateProfile {
  mobileNumber: number;
  permanentAddress: string;
  officeAddress: string;
}

interface Login {
  userId: number;
  password: string;
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


