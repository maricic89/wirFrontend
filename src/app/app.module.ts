import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HeaderComponent} from "./header/header.component";
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {ContentComponent} from './content/content.component';
import {SingUpComponent} from "./auth/singup/singup.component";
import {ProtectedComponent} from "./protected/protected.component";
import {AuthService} from "./auth/auth.service";
import {PageNotFoundComponent} from "./shared/notFound.component";
import {AppRootRoutingModule} from "./app-routing.module";
import {FacebookModule} from "ngx-facebook";
import {AuthGuard} from "./auth/auth-guard.service";

const appRootComponents = [
  AppComponent,
  HeaderComponent,
  ContentComponent,
];

const appModules = [
  LoginComponent,
  SingUpComponent,
  ProtectedComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: [
    ...appRootComponents,
    ...appModules
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRootRoutingModule,
    FacebookModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  // entryComponents: [BComponent]
})
export class AppModule { }
