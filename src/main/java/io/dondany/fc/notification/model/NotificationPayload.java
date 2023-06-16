package io.dondany.fc.notification.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import static io.dondany.fc.notification.model.NotificationTypes.FRIEND_REQUEST;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = FriendNotificationPayload.class, name = FRIEND_REQUEST),
})
public interface NotificationPayload {
    String getType();
}
