import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostDetailComponent } from './postDetailPage.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostDetailComponent
  ],
  exports: [
    PostDetailComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class PostDetailModule { }
