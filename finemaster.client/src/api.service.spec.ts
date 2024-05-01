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
        return response.token;
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  createPost(postDetails: any): Observable<any> {
    const url = `${this.baseUrl}/Teacher/CreatePost`;
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(url, postDetails, { headers: headers }).pipe(
     
      catchError((error: any) => {
        console.error(error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  getPosts(): Observable<any> {
    const url = `${this.baseUrl}/Student/GetPosts`;
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url ,{ headers: headers }).pipe(
      
      catchError((error: any) => {
        console.error(error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
  getPostDetail(id: any): Observable<any> {
    const url = `${this.baseUrl}/Post/getPostDetail/${id}`;
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers }).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
