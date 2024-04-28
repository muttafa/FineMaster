import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  email: any;
  password: any;

  ngOnInit() {

  }


  login() {
    if (this.email != null && this.password != null) {
      let dataToSend = {
        email: this.email,
        password: this.password
      };
      this.apiService.Login(dataToSend).subscribe((response: any) => {
        localStorage.setItem("token", response);
        this.getUserInfo(response);
        this.cdr.detectChanges();
      })
    }
  }

  getUserInfo(token: any) {
    this.apiService.getUserInfo(token).subscribe((response: any) => {
      if (response != null) {
        if (response.role == 'student') {
          this.router.navigate(['/student-home']);
          sessionStorage.setItem("userInfo",JSON.stringify(response))
        }
        else if (response.role == 'teacher') {
          this.router.navigate(['/teacher-home']);
          sessionStorage.setItem("userInfo", JSON.stringify(response))
        }
        else {

        }
      }
    })
  }
}
