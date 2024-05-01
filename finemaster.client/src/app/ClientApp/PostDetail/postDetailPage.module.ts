import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostDetailComponent } from './postDetailPage.component';

@NgModule({
  declarations: [
    PostDetailComponent
  ],
  exports: [
    PostDetailComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: []
})
export class StudentHomePageModule { }
