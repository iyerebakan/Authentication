import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable()
export class HomeGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let logged = this.loginService.loggedIn();
        if (logged) {
            this.router.navigate([""]);
            return false;
        }

        return true;
    }

}