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
  private _user: BehaviorSubject<UserType | null> = new BehaviorSubject<UserType | null>(null);

  readonly user$ = this._user.asObservable();

  constructor(private http: HttpClient,
              private userService: UserService) {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      console.log("check jwt")
      this.userService.getAuthenticatedUser()
        .subscribe((user) => {
          this._user.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
    }
  }

  signIn(signIn: SignInFormValueType, callback: Function) {
    this.http.post<TokenResponseType>('/api/auth/authenticate', signIn)
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('jwtToken', token);

        this.userService.getAuthenticatedUser()
          .subscribe((user) => {
            this._user.next(user);
            localStorage.setItem('user', JSON.stringify(user));
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
            this._user.next(user);
            localStorage.setItem('user', JSON.stringify(user));
          })
        callback();
      })
  }

  signOut() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    this._user.next(null);
  }

}
