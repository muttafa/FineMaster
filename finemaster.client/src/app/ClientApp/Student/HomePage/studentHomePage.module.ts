import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StudentHomePageComponent } from './studentHomePage.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    RouterModule.forChild([
      { path: '', component: StudentHomePageComponent },
    ]),
  ],
  providers: [],
  bootstrap: []
})
export class StudentHomePageModule { }
