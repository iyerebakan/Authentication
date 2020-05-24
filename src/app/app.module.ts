import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './pages/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginService } from './services/login/login.service';
import { HomeComponent } from './pages/home/home.component';
import { LoginGuard } from './services/login/login.guard';
import { HomeGuard } from './pages/home/home.guard';

import {SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig} from 'angularx-social-login'
import { RegisterService } from './services/register/register.service';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("509467459332-9p6v68ur7uv5r7o1jg2mjplrj098acb9.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    LoginService, 
    LoginGuard, 
    HomeGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
