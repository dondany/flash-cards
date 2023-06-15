package io.dondany.fc.friend.model;

import io.dondany.fc.user.model.UserDto;

public class FriendInfoDto {
    private Long id;
    private UserDto friend;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDto getFriend() {
        return friend;
    }

    public void setFriend(UserDto friend) {
        this.friend = friend;
    }
}
