import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import {Router} from "@angular/router";
import {SignUpFormControlType} from "../types/sign-up-form-group.type";

@Component({
  selector: 'fc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  protected singUpFormGroup = this.formBuilder.group<SignUpFormControlType>({
    firstname: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    lastname: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      nonNullable: true
    }),
    password: this.formBuilder.control('', {validators: [Validators.required], nonNullable: true}),
  })

  constructor(private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  handleOnSubmit() {
    const value = this.singUpFormGroup.value;
    this.authenticationService.register(value, () => {
      this.router.navigate(['home']);
    });
  }

  get firstname() {
    return this.singUpFormGroup.controls.firstname;
  }

  get lastname() {
    return this.singUpFormGroup.controls.lastname;
  }

  get email() {
    return this.singUpFormGroup.controls.email;
  }

  get password() {
    return this.singUpFormGroup.controls.password;
  }
}
