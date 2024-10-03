import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TeacherHomePageComponent } from './teacherHomePage.component';
import { DxDataGridModule } from 'devextreme-angular';

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
    DxDataGridModule,
  ],
  providers: [],
  bootstrap: []
})
export class TeacherHomePageModule { }
