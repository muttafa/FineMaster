import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }



  public Editor = ClassicEditor;

  ngOnInit(): void {

  }


}
