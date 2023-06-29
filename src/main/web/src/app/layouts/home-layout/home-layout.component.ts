import {Component, OnInit} from '@angular/core';
import {NotificationType} from "../../shared/types/notification-type";
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {NotificationService} from "../../shared/services/notification-service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserType} from "../../shared/services/user-type";

@Component({
  selector: 'fc-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
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
          this.router.navigate(['/auth'])
        }
      }
    ];
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

}
