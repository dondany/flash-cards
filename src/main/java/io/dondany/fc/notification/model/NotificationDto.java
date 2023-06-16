package io.dondany.fc.notification.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationDto {
    private Long id;
    private String type;
    private String message;
    private boolean read;
    private NotificationPayload payload;
}
