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

 

  ngOnInit(): void {

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
