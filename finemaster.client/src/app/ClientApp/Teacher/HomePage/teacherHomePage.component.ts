import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SignalRService } from '../../../../services/signalRServices/signal-rservice.service';


@Component({
  selector: 'app-teacherHome',
  templateUrl: './teacherHomePage.component.html',
  styleUrls: ['./teacherHomePage.component.css']
})
export class TeacherHomePageComponent implements OnInit {
  private hubConnection!: signalR.HubConnection;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private signalRService: SignalRService,
  ) {
      
    this.signalRService.startConnection();
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });

  }

  currentUserID: any;
 
  receivedMessages: string[] = [];

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.getMessage().subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
    const storedUser = this.cookieService.get('userInfo');
    if (storedUser) {
      var storedUserJson = JSON.parse(storedUser);
      this.currentUserID = storedUserJson.id;
    }
  }
  toggleSubMenu(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const submenu = target.nextElementSibling;
    if (submenu && submenu.classList.contains('collapse')) {
      submenu.classList.toggle('show');
    }
  }

}
