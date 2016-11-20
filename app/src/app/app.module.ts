import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  AppComponent
} from './app.component';
import {
  CreateApiComponent
} from './Components/create-api/create-api.component.ts';
import {
  ViewApisComponent
} from './Components/view-apis/view-apis.component.ts';

import {
  ViewDetailsApiComponent
} from './Components/viewDetails-api/viewDetails-api.component.ts';

import {
  FormsModule
} from '@angular/forms';
import {
  HttpModule
} from '@angular/http';

import {
  JsonDataService
} from './Services/jsonData.service';


const routes: Routes = [{
  path: '',
  redirectTo: '/view',
  pathMatch: 'full'
}, {
  path: 'view',
  component: ViewApisComponent
}, {
  path: 'create',
  component: CreateApiComponent
}];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AppComponent,
    CreateApiComponent,
    ViewApisComponent,
    ViewDetailsApiComponent
  ],
  providers: [JsonDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
