import { Component, OnInit } from '@angular/core';
import { SignalRService, ChatMessage } from '../../../services/signalRServices/signal-rservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];
  recipientEmail: string = '';

  constructor(private signalRService: SignalRService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.messageReceived$.subscribe((message: string) => {
      if (message) {
        this.messages.push({senderEmail: 'Me', recipientEmail: this.recipientEmail, message: message, timestamp: new Date() });
      }
    });

    this.route.paramMap.subscribe(params => {
      this.recipientEmail = window.history.state.data.receiverMail;
    });
  }

  loadHistory(): void {
    this.signalRService.getMessageHistory(this.recipientEmail).subscribe((messages: ChatMessage[]) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    this.signalRService.sendMessage(this.recipientEmail, this.message);
    this.message = '';
  }
}
