import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new BehaviorSubject<string>('');

  messageReceived$ = this.messageReceived.asObservable();
  token: string = localStorage.getItem('token') || '';
  constructor(private http: HttpClient) { }

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
  getMessageHistory(email: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`https://localhost:7235/api/chat/history/${email}`);
  }
}

export interface ChatMessage {
  senderEmail: string;
  recipientEmail: string;
  message: string;
  timestamp: Date;
}
