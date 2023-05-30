import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponseType} from "../types/token-response.type";
import {SignInFormValueType} from "../types/sign-in-form-group.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(signIn: SignInFormValueType) {
    this.http.post<TokenResponseType>('http://localhost:8080/api/v1/auth/authenticate', signIn)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
      })
  }

  // register(signUp: SignUpType) {
  //   this.http.post<TokenResponseType>('', signUp)
  //     .subscribe(response => {
  //       const token = response.token;
  //       localStorage.setItem('jtwToken', token);
  //     })
  // }
}
