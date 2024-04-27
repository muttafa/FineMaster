import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './ClientApp/Login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './ClientApp/Navbar/navbar.module';
import { HomeModule } from './ClientApp/Home/home.module';
import { FooterModule } from './ClientApp/Footer/footer.module';
import { RegisterComponent } from './ClientApp/Register/register.component';
import { StudentHomePageModule } from './ClientApp/Student/HomePage/studentHomePage.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    FooterModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    StudentHomePageModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
