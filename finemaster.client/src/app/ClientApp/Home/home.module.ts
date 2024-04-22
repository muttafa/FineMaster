import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
