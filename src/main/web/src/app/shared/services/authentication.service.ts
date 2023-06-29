import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenResponseType} from "../../pages/auth/types/token-response.type";
import {SignInFormValueType} from "../../pages/auth/types/sign-in-form-group.type";
import {SignUpFormValueType} from "../../pages/auth/types/sign-up-form-group.type";
import {UserService} from "./user-service";
import {UserType} from "./user-type";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: BehaviorSubject<UserType | null> = new BehaviorSubject<UserType | null>(null);

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
            this.user.next(user);
            callback();
          })
      })
  }

  register(signUp: SignUpFormValueType, callback: Function) {
    this.http.post<TokenResponseType>('/api/auth/register', signUp)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);
        this.userService.getAuthenticatedUser()
          .subscribe((user) => {
            this.user.next(user);
          })
        callback();
      })
  }

  signOut() {
    console.log('sign-out')
    localStorage.removeItem('jwtToken');
    this.user.next(null);
  }

  get authenticatedUser() {
    return this.user.asObservable();
  }

}
