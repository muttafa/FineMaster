import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ClientApp/Home/home.component'; 
import { RegisterComponent } from './ClientApp/Register/register.component';
import { LoginComponent } from './ClientApp/Login/login.component';
import { StudentHomePageComponent } from './ClientApp/Student/HomePage/studentHomePage.component';
import { TeacherHomePageComponent } from './ClientApp/Teacher/HomePage/teacherHomePage.component';
import { PostingComponent } from './ClientApp/Teacher/Posting/posting.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student-home', component: StudentHomePageComponent },
  { path: 'teacher-home', component: TeacherHomePageComponent },
  { path: 'posting', component: PostingComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Varsayılan olarak /home'a yönlendir
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
