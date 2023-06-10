import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponseType} from "../types/token-response.type";
import {SignInFormValueType} from "../types/sign-in-form-group.type";
import {SignUpType} from "../types/sign-up.type";
import {SignUpFormValueType} from "../types/sign-up-form-group.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  authenticate(signIn: SignInFormValueType, callback: Function) {
    this.http.post<TokenResponseType>('/api/auth/authenticate', signIn)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        callback();
      })
  }

  register(signUp: SignUpFormValueType, callback: Function) {
    this.http.post<TokenResponseType>('/api/auth/register', signUp)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        callback();
      })
  }
}
