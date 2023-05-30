import {Component} from '@angular/core';
import {SignInFormControlType} from "./types/sign-in-form-group.type";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'fc-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  protected formGroup = this.formBuilder.group<SignInFormControlType>({
    email: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    password: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  })

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
  }

  handleOnSubmit() {
    const value = this.formGroup.value;
    this.authenticationService.authenticate(value);
  }

  get email() {
    return this.formGroup.controls.email;
  }

  get password() {
    return this.formGroup.controls.password;
  }

}