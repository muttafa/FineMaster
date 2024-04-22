import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/ClientApp/Home/home.component'; 
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Varsayılan olarak /home'a yönlendir
  { path: '**', redirectTo: '/home' } // Bilinmeyen URL'leri /home'a yönlendir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
