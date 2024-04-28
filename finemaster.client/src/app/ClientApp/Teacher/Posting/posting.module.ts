import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostingComponent } from './posting.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostingComponent
  ],
  exports: [
    PostingComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class PostingModule { }
