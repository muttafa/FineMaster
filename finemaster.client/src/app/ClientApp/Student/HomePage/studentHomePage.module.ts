import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StudentHomePageComponent } from './studentHomePage.component';

@NgModule({
  declarations: [
    StudentHomePageComponent
  ],
  exports: [
    StudentHomePageComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: []
})
export class StudentHomePageModule { }
