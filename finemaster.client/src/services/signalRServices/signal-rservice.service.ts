import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7235/chathub', {
        accessTokenFactory: () => this.getToken()! 
      })
      .build();

    this.hubConnection.start().then(() => {
      console.log('SignalR connection started');
    }).catch(err => {
      console.error('Error while starting connection:', err);
    });

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageSubject.next(message);
    });
  }

  private getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  sendMessage(userID: string,message: string) {
    this.hubConnection.invoke('SendMessage',userID, message);
  }

  getMessage(): Observable<string> {
    return this.messageSubject.asObservable();
  }
}
