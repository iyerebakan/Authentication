import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.loginService.loggedIn();
        if(logged){
            
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }
}