import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrl: './posting.component.css'
})
export class PostingComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  post = {
    lessonID: 0,
    hourlyRate: 0,
    title: '',
    summary: '',
    image: '',
    userID: null,

  };

  lessonList: any;


  ngOnInit(): void {
    this.getLessonList();
  }


  getLessonList() {
  
    this.apiService.getLessons().subscribe((response: any) => {
      this.lessonList = response.lessonList;
      console.log(this.lessonList);
    });
  }

  submitPost() {
    const userInfoString = sessionStorage.getItem("userInfo");
    if (userInfoString !== null) {
      const userInfo = JSON.parse(userInfoString);
      this.post.userID = userInfo.id;

    }
    this.apiService.createPost(this.post).subscribe();
    this.resetForm();
  }

  resetForm() {
    this.post = {
      lessonID: 0,
      hourlyRate: 0,
      title: '',
      summary: '',
      image: '',
      userID : null
    };
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Base64 verisini al
        const imageDataUrl: string = reader.result as string;
        // Görüntüyü kaydet
        this.post.image = imageDataUrl;
      };
      // Dosyayı oku
      reader.readAsDataURL(file);
    }
  }

  saveImageToAssets(imageDataUrl: string, filePath: string) {
    const byteString = atob(imageDataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filePath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
