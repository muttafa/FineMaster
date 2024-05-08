import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private location: Location) { }

  urlPath: any;
  userRole: any;
  ngOnInit() {
    this.urlPath = this.getCurrentUrl();

    if (this.urlPath != "/home") {
      const token = localStorage.getItem('token');
      if (token) {
        this.apiService.getUserInfo(token).subscribe(response => {
          this.userRole = response.role;
          this.cdr.detectChanges();
        })
      }
    }
 
  }

  getCurrentUrl() {
    const currentUrl = this.location.path(); // Sadece yolu alır
    return currentUrl;
  }

}
