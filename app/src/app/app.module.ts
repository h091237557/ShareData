import {  NgModule } from '@angular/core';
import {  BrowserModule } from '@angular/platform-browser';
import {  AppComponent } from './app.component';
import { CreateApiComponent } from './Components/create-api.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
		FormsModule
  ],
  declarations: [
    AppComponent,
		CreateApiComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
