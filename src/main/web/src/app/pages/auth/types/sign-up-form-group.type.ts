import {FormControl, FormGroup} from "@angular/forms";
import {SignUpType} from "./sign-up.type";

type SignUpFormGroupType = FormGroup<{
  firstname: FormControl<SignUpType['firstname']>,
  lastname: FormControl<SignUpType['lastname']>,
  email: FormControl<SignUpType['email']>,
  password: FormControl<SignUpType['password']>,

}>;

export type SignUpFormControlType = SignUpFormGroupType['controls'];
export type SignUpFormValueType = SignUpFormGroupType['value'];
