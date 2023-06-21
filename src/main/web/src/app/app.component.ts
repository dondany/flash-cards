import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./shared/services/authentication.service";
import {UserType} from "./shared/services/user-type";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {NotificationType} from "./shared/types/notification-type";
import {NotificationService} from "./shared/services/notification-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';
  menuItems!: MenuItem[];

  notifications!: NotificationType[];

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
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

  openNotifications() {
    this.notificationService.getNotifications()
      .subscribe((notifications) => {
        this.notifications = notifications;
      })
  }

  readNotification(notification: NotificationType) {
    if (notification.read) {
      return;
    }
    this.notificationService.readNotification(notification.id)
      .subscribe(()  => {
        this.openNotifications();
      });
  }

  deleteNotification(id: number) {
    this.notificationService.deleteNotification(id)
      .subscribe(() => {
        this.openNotifications();
      })
  }

  get user(): UserType | null {
    return this.authenticationService.user;
  }


}
