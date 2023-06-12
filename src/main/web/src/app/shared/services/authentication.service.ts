import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponseType} from "../../pages/auth/types/token-response.type";
import {SignInFormValueType} from "../../pages/auth/types/sign-in-form-group.type";
import {SignUpFormValueType} from "../../pages/auth/types/sign-up-form-group.type";
import {UserService} from "./user-service";
import {UserType} from "./user-type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: UserType | null = null;

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  signIn(signIn: SignInFormValueType, callback: Function) {
    this.http.post<TokenResponseType>('/api/auth/authenticate', signIn)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        this.userService.getAuthenticatedUser()
          .subscribe((user) => {
            this._user = user;
          })
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

  signOut() {
    this._user = null;
    localStorage.removeItem('jwtToken');
  }

  get user(): UserType | null {
    return this._user;
  }

  isAuthenticated(): boolean {
    return this._user != null;
  }

}
