import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ServiceResult } from 'src/app/models/serviceResult';
import { Router } from '@angular/router';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService, SocialUser } from 'angularx-social-login';
import { ExternalLoginUser } from 'src/app/models/externalLoginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  loginForm: FormGroup;
  loginUser: any = {};
  errorText: string = "Sign In to your account";
  register: string =  "register";

  private user: SocialUser;
  private loggedIn: boolean;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", Validators.required],
        password: ["", [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]]
      },
    )
  }

  login() {
    if (this.loginForm.valid) {
      this.loginUser = Object.assign({}, this.loginForm.value)
      this.loginService.login(this.loginUser).subscribe(data => {
        this.loginResult(data);
      });
    }
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      let externalLoginUser = new ExternalLoginUser();
      externalLoginUser.email = data.email;
      externalLoginUser.loginProvider = "google";
      externalLoginUser.providerKey = data.id;
      this.loginService.externalLogin(externalLoginUser).subscribe(data => {
        this.loginResult(data);
      });
    });

  }

  loginResult(data: ServiceResult) {
    if (data.success) {
      this.loginService.saveToken(data.data["token"]);
      this.router.navigateByUrl("/home");
    } else {
      this.errorText = data.message;
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  registerForm() {
    this.router.navigateByUrl("/" + this.register);
  }

}
