import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyProfileComponent implements OnInit {

  constructor(private http: HttpClient, private cookieService: CookieService, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) { }


  public Editor = ClassicEditor;
  editorData = '';
  savedProfile!: SafeHtml;
  editButton: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.apiService.getUserInfo(token).subscribe((response: any) => {
      if (response != null) {
        this.apiService.getTeacherProfileByID(response.id).subscribe((sresponse: any) => {
          if (sresponse != null) {
            this.savedProfile = this.sanitizer.bypassSecurityTrustHtml(sresponse.data);
            console.log(this.savedProfile)
          }
        });
      }
    })
  }
  edit() {
    this.editButton = true;
  }
  saveProfile() {
    console.log(this.editorData);
    const token = localStorage.getItem("token");
    this.apiService.getUserInfo(token).subscribe((response: any) => {
      if (response) {
        this.apiService.saveTeacherProfile(response.id,this.editorData).subscribe((response: any) => {
          console.log(response);
        });

      }
    })

  

  }

}
