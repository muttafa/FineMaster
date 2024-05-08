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

  selectedLessons: number[] = [];
  selectedOption: any;
  minPrice: any;
  maxPrice: any;
  selectedCity: any;
  selectedDistrict: any;


  postList: any;
  currentPage: number = 1;
  itemsPerPage: number = 40;
  totalItems: any;
  lessonList: any;
  cities: any;
  districts: any;
  none = 'none';

  ngOnInit(): void {
    this.getPosts();
    this.getLessons();
    this.getCities();
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
      this.totalItems = this.postList.length;

    });
  }

  goToDetailPage(id: any) {
    if (id != null) {
      this.router.navigate(['/postDetail', id]);
    }
  }
  getLessons() {
    this.apiService.getLessons().subscribe((response: any) => {
      this.lessonList = response.lessonList;
    })
  }
  async getCities() {
    this.cities = await this.apiService.getCities().toPromise();

  }
  loadDistrict(cityID: any) {
    const sCity = this.cities.data.find((city: any) => city.id == this.selectedCity);

    if (sCity) {
      this.districts = sCity.districts;
    } else {
    }
  }

  filter() {
    const dataToSend = {
      lessonList: this.selectedLessons,
      selectedStyles: this.selectedOption,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      selectedCity: this.selectedCity,
      selectedDistrict: this.selectedDistrict
    };

    this.apiService.applyFilter(dataToSend).subscribe((response: any) => {
      this.postList = response.data;
      this.cdr.detectChanges();
    })

  }
  clear() {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    const radios: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.checked = false;
    });
    this.getPosts();
    this.selectedLessons = [];
    this.selectedOption = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCity = null;
    this.selectedDistrict = null;
  }
  toggleSelectedLessons(event: any, lessonID: number) {
    if (event.target.checked) {
      this.selectedLessons.push(lessonID);
    } else {

      const index = this.selectedLessons.indexOf(lessonID);
      if (index !== -1) {
        this.selectedLessons.splice(index, 1);
      }
    }
  }

}
