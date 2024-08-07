import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SignalRService, ChatMessage } from '../../../services/signalRServices/signal-rservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service.spec';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];
  recipientEmail: string = '';
  userList: any;
  userEmail: string = '';
  firstMessage: boolean = false;
  curruser: any;
  selecteduser: any;
  constructor(private signalRService: SignalRService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private cookieService: CookieService, private apiService: ApiService) { }

  async ngOnInit() {

    this.signalRService.startConnection();
    this.signalRService.messageReceived$.subscribe((message: string) => {
      if (message) {
        this.messages.push({ senderEmail: 'Me', recipientEmail: this.recipientEmail, message: message, timestamp: new Date() });
        this.loadHistory();
        this.cdr.detectChanges();
      }
    });

    this.route.paramMap.subscribe(params => {
      this.recipientEmail = window.history.state.data.receiverMail;
      if (this.recipientEmail != null) {
        this.firstMessage = true;
      }
    });
    await this.loadUserHistory();
    await this.loadHistory();

  }


  async loadHistory() {

   const token = localStorage.getItem('token');

    await this.apiService.getUserInfo(token).subscribe(response => {
      console.log(response.email);
      this.curruser = response.email;

      if (this.curruser) {
        this.signalRService.getMessageHistory(this.curruser, this.recipientEmail).subscribe((messages: ChatMessage[]) => {
          this.messages = messages;
          this.userEmail = this.messages[0].senderEmail;
        });
      }
    })

   

  }

  async loadUserHistory() {
    const token = localStorage.getItem('token');

    await this.apiService.getUserInfo(token).subscribe(response => {
      console.log(response.email);
      this.curruser = response.email;

      if (this.curruser) {
        this.apiService.getUserHistory(this.curruser).subscribe((response: any) => {
          this.userList = response;
        });
      }

    })
 
  }

  selectChat(userMail: string) {
    console.log(this.curruser);
    this.recipientEmail = userMail;
    this.selecteduser = this.userList.find((x: any) => x.email == this.recipientEmail);
    this.loadHistory();
    this.cdr.detectChanges();
  }

  sendMessage(): void {
    var appData = JSON.parse(localStorage.getItem('userInfo')!);
    console.log();
    if (this.recipientEmail == '') {
      if (appData.email == this.userEmail) {
        this.recipientEmail = this.messages[0].recipientEmail;
      }
      else {
        this.recipientEmail = this.messages[0].senderEmail;
      }
    }


    this.signalRService.sendMessage(this.recipientEmail, this.message);
    this.message = '';
    this.loadHistory();
    this.cdr.detectChanges();
  }
}
