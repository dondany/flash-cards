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
  friendsRequests?: FriendType[];

  showNewFriendModal: boolean = false;
  searchUserInput: string = '';

  users?: UserType[];

  constructor(private friendsService: FriendsService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.init();

    this.breadCrumbItems = [{ label: 'Friends', routerLink: '.'}];
    this.homeItem = { icon: 'pi pi-home', routerLink: '/home'}
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
        this.friends = friends.filter(friend => friend.status === 'ACCEPTED');
        this.friendsRequests = friends.filter(friend => friend.status === 'PENDING');
      });
  }

  acceptFriend(id: number) {
    this.friendsService.acceptFriend(id)
      .subscribe((friend) => {
        this.init();
      });
  }

  rejectFriend(id: number) {
    this.friendsService.rejectFriend(id)
      .subscribe((friend) => {
        this.init();
      });
  }

  deleteFriend(id: number) {
    this.friendsService.deleteFriend(id)
      .subscribe(() => {
        this.init();
      });
  }

  isAlreadyFriend(user: UserType): boolean | undefined {
    return this.friends?.some(f => f.friend.id === user.id) || this.friendsRequests?.some(f => f.friend.id === user.id);
  }

}
