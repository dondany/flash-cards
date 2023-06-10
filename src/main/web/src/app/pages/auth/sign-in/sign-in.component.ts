import {Component} from '@angular/core';
import {SignInFormControlType} from "../types/sign-in-form-group.type";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  protected singInFormGroup = this.formBuilder.group<SignInFormControlType>({
    email: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    password: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  })

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  handleOnSubmit() {
    const value = this.singInFormGroup.value;
    this.authenticationService.authenticate(value, () => {
      this.router.navigate(['projects']);
    });
  }

  get email() {
    return this.singInFormGroup.controls.email;
  }

  get password() {
    return this.singInFormGroup.controls.password;
  }

}
