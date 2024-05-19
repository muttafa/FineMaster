import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatComponent } from './chat.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  

@NgModule({
  declarations: [
    ChatComponent
  ],
  exports: [
    ChatComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: []
})
export class ChatModule { }
