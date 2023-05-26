package io.dondany.fc.notification;

import io.dondany.fc.notification.model.NotificationDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public List<NotificationDto> getNotifications(@AuthenticationPrincipal User user) {
        return notificationService.getNotifications(user);
    }

    @PostMapping("/{id}/read")
    public void readNotification(@PathVariable Long id) {
        notificationService.readNotification(id);
    }

}
