import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./shared/services/authentication.service";
import {UserType} from "./shared/services/user-type";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';
  menuItems!: MenuItem[];

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Sign Out',
        icon: 'pi pi-power-off',
        command: () => {
          this.authenticationService.signOut();
          this.router.navigate(['/'])
        }
      }
    ];
  }


  isUserAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  get user(): UserType | null {
    return this.authenticationService.user;
  }

}
