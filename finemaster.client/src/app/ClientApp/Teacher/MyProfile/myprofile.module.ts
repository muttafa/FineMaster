import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyProfileComponent } from './myprofile.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    MyProfileComponent
  ],
  exports: [
    MyProfileComponent
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
export class MyProfileModule { }
