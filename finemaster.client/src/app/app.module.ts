import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './ClientApp/Navbar/navbar.module';
import { HomeModule } from './ClientApp/Home/home.module';
import { FooterModule } from './ClientApp/Footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    FooterModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
