import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostingComponent } from './posting.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


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
    CKEditorModule,

  ],
  providers: [],
  bootstrap: []
})
export class PostingModule { }
