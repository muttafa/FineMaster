import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-studentHome',
  templateUrl: './studentHomePage.component.html',
  styleUrl: './studentHomePage.component.css'
})
export class StudentHomePageComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  postList: any;

  ngOnInit(): void {
    this.getPosts();
  }
  toggleSubMenu(event: Event): void {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const submenu = target.nextElementSibling;
    if (submenu && submenu.classList.contains('collapse')) {
      submenu.classList.toggle('show');
    }
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  getPosts() {
    this.apiService.getPosts().subscribe((response: any) => {
      this.postList = response;
      console.log(this.postList);
    });
  }
  goToDetailPage(id: any) {
    if (id != null) {
      this.router.navigate(['/postDetail', id]);
    }
  }

}
