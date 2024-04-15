import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: []
})
export class NavbarModule { }
