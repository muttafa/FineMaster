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
  ) { }

  currentUserID: any;
 
  receivedMessages: string[] = [];
  studentsInfo: any;
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.messageReceived$.subscribe((message: string) => {
      if (message) {
        this.receivedMessages.push(message);
        console.log(message);
      }
    });
    const storedUser = this.cookieService.get('userInfo');
    if (storedUser) {
      var storedUserJson = JSON.parse(storedUser);
      this.currentUserID = storedUserJson.id;
      this.studentsInfo = this.getStudentData(this.currentUserID)

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

  async getStudentData(tId: number) {
    const studentData = await this.apiService.getTeacherStudents(tId);
    return studentData;
  }




}


