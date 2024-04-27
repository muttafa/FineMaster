import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  memberType: any;
  lessonList: any;
  cities: any;
  selectedLesson: any;
  selectedCity: any;
  districts: any;
  selectedDistrict: any;
  none = 'none';
  submitted = false;

  registrationForm!: FormGroup;

  ngOnInit() {
    this.loadData();

    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      memberType: ['', Validators.required],
      birthdate: ['', Validators.required],
      number: ['', Validators.required],
      selectedLesson: [null],
      selectedCity: [null],
      selectedDistrict: [null]
    });
  }

  async loadData() {
    this.lessonList = await this.apiService.getLessons().toPromise();
    this.cities = await this.apiService.getCities().toPromise();
  }

  checkDefaultValues() {
    const selectedLessonControl = this.registrationForm.get('selectedLesson');
    const selectedCityControl = this.registrationForm.get('selectedCity');
    const selectedDistrictControl = this.registrationForm.get('selectedDistrict');


    if (selectedLessonControl && selectedLessonControl.value === 'none') {
      selectedLessonControl.setErrors({ 'required': true });
    }

    if (selectedCityControl && selectedCityControl.value === 'none') {
      selectedCityControl.setErrors({ 'required': true });
    }

    if (selectedDistrictControl && selectedDistrictControl.value === 'none') {
      selectedDistrictControl.setErrors({ 'required': true });
    }


  }
  passwordControl() {
    const password = this.registrationForm.get('password');
    const confirmPassword = this.registrationForm.get('confirmPassword');
    if (password?.value == confirmPassword?.value) {
      return true;
    }
    else {
      return false;
    }
  }
  loadDistinc(cityID: any) {
    const selectedCityId = this.registrationForm.get('selectedCity')?.value;
    const sCity = this.cities.data.find((city: any) => city.id === selectedCityId);

    if (sCity) {
      this.districts = sCity.districts;
    } else {
    }
  }

  checkForm() {
    this.submitted = true;
    this.checkDefaultValues();

    if (this.passwordControl()) {
      if (this.registrationForm.valid) {

        let dataToSend = {
          userName: this.registrationForm.get('username')?.value,
          email: this.registrationForm.get('email')?.value,
          password: this.registrationForm.get('password')?.value,
          memberType: this.registrationForm.get('memberType')?.value,
          birthdate: this.registrationForm.get('birthdate')?.value,
          selectedLesson: this.registrationForm.get('selectedLesson')?.value,
          selectedCity: this.registrationForm.get('selectedCity')?.value,
          selectedDistrict: this.registrationForm.get('selectedDistrict')?.value,
          phoneNumber: this.registrationForm.get('number')?.value,
        };

        if (dataToSend.selectedLesson == '' ||  dataToSend.selectedCity == '' ||  dataToSend.selectedDistrict == '') {
          dataToSend.selectedLesson = null;
          dataToSend.selectedCity = null;
          dataToSend.selectedDistrict = null;
        }

        this.apiService.createUser(dataToSend).subscribe();

      } 

    }



    

  }

}
