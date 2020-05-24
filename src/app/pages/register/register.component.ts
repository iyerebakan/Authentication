import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  registerForm: FormGroup;
  registerUser: any = {};
  errorText: string = "Create your account";

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    )
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value ===
      g.get('confirmPassword').value ? null : { mismatch: true }
  }

  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value)
      this.registerService.register(this.registerUser).subscribe(data => {debugger;
        if (data.success) {
          this.router.navigate(["login"]);
        } else {
          this.errorText = data.message;
        }
      });
    }
  }

}
