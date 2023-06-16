package io.dondany.fc.notification.model;

import static io.dondany.fc.notification.model.NotificationTypes.FRIEND_REQUEST;

public class FriendNotificationPayload implements NotificationPayload {
    private long friendId;

    public FriendNotificationPayload() {}

    public FriendNotificationPayload(long friendId) {
        this.friendId = friendId;
    }

    @Override
    public String getType() {
        return FRIEND_REQUEST;
    }

    public long getFriendId() {
        return friendId;
    }

    public void setFriendId(long friendId) {
        this.friendId = friendId;
    }
}
