import {  NgModule } from '@angular/core';
import {  BrowserModule } from '@angular/platform-browser';
import {  AppComponent } from './app.component';
import { CreateApiComponent } from './Components/create-api.component';
import { ViewApisComponent } from './Components/view-apis/view-apis.component';

import {FormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {JsonDataService} from './Services/jsonData.service';

@NgModule({
  imports: [
    BrowserModule,
		FormsModule,
		HttpModule
  ],
  declarations: [
    AppComponent,
		CreateApiComponent,
		ViewApisComponent
  ],
	providers: [JsonDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
