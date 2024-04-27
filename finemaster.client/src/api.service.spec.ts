import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  baseUrl = `https://localhost:7235/api`;


  getLessons(): Observable<any> {
    const url = `${this.baseUrl}/Common/GetLessonList`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  getCities(): Observable<any> {
    const url = `https://turkiyeapi.dev/api/v1/provinces`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  createUser(userInfo: any): Observable<any> {
    const url = `${this.baseUrl}/Common/createUser`;
    return this.http.post(url, userInfo).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  getUserInfo(token: any): Observable<any> {
    const url = `${this.baseUrl}/User/getUserInfo`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });


    return this.http.get(url, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  
  Login(userInfo: any): Observable<any> {
    const url = `${this.baseUrl}/Auth/Login`;
    return this.http.post(url, userInfo).pipe(
      map((response: any) => {
        // Başarılı bir yanıt alındığını varsayalım
        return response.token; // veya uygun olan diğer veriyi döndürün
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }


  getProducts(): Observable<any> {
    const url = `${this.baseUrl}/Products/getProducts`;
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }


}
