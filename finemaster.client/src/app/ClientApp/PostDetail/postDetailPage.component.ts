import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../api.service.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../../services/signalRServices/signal-rservice.service';


@Component({
  selector: 'app-postDetailPage',
  templateUrl: './postDetailPage.component.html',
  styleUrl: './postDetailPage.component.css'
})
export class PostDetailComponent implements OnInit {

  constructor(private http: HttpClient, private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private signalRService: SignalRService) { }

  postId: any;
  postDetails: any;
  city: any;
  district: any;
  message: string = '';
  receivedMessages: string[] = [];
  receiverID: any;
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.getMessage().subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
    this.getLocation();
    this.route.params.subscribe(params => {
      this.postId = params['userID'];
    });
    this.getPostDetail(this.postId);
  }
  getLocation() {
    this.apiService.getCities().subscribe((response: any )=> {
      console.log(response)
      this.city = response.data.find((x: any) => x.id == this.postDetails.city).name;
      let districts = response.data.find((x: any) => x.id == this.postDetails.city).districts;
      this.district = districts.find((x: any) => x.id == this.postDetails.district).name;
    })

  }

  getPostDetail(id: any) {
    if (id != null) {
      this.apiService.getPostDetail(id).subscribe((response: any) => {
        if (response.success) {
          this.postDetails = response.data;
          this.receiverID = this.postDetails.userID.toString();
        }
      });
    }
  }

  sendMessage() {
    const userID = this.receiverID;
    this.signalRService.sendMessage( userID, this.message);
    this.message = ''; 
  }


}
