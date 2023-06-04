import {FormControl, FormGroup} from "@angular/forms";
import {SignInType} from "./sign-in.type";

type SignInFormGroupType = FormGroup<{
  email: FormControl<SignInType['email']>,
  password: FormControl<SignInType['password']>
}>;

export type SignInFormControlType = SignInFormGroupType['controls'];
export type SignInFormValueType = SignInFormGroupType['value'];
