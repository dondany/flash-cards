import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FriendsService} from "../friends-service";
import {FriendType} from "../types/friend-type";
import {UserType} from "../../../shared/services/user-type";
import {UserService} from "../../../shared/services/user-service";

@Component({
  selector: 'fc-friends-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {
  breadCrumbItems?: MenuItem[];
  homeItem?: MenuItem;
  friends?: FriendType[];
  showNewFriendModal: boolean = true;
  searchUserInput: string = '';

  users?: UserType[];

  constructor(private friendsService: FriendsService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.init();

    this.breadCrumbItems = [{ label: 'Friends', routerLink: '/friends'}];
    this.homeItem = { icon: 'pi pi-home', routerLink: '/../'}
  }

  handleOnSubmit() {
    this.userService.getUsersByFirstname(this.searchUserInput)
      .subscribe((users => {
        this.users = users;
      }));
  }

  addFriend(id: number) {
    this.friendsService.addFriend(id)
      .subscribe((friend) => {
        this.init();
        this.showNewFriendModal = false;
      });
  }

  init() {
    this.friendsService.getFriends()
      .subscribe((friends) => {
        this.friends = friends;
      });
  }

}
