import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new BehaviorSubject<string>('');

  messageReceived$ = this.messageReceived.asObservable();
  token: string = localStorage.getItem('token') || '';
  constructor() { }

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7235/chathub', { accessTokenFactory: () => this.token })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messageReceived.next(message);
    });
  }

  sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
