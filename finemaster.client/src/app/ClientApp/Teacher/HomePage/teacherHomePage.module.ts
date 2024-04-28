import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TeacherHomePageComponent } from './teacherHomePage.component';

@NgModule({
  declarations: [
    TeacherHomePageComponent
  ],
  exports: [
    TeacherHomePageComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: []
})
export class TeacherHomePageModule { }
