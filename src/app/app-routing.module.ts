import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginGuard } from './services/login/login.guard';
import { HomeGuard } from './pages/home/home.guard';


const routes: Routes = [

  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent,canActivate:[HomeGuard] },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
