package io.dondany.fc.notification;

import io.dondany.fc.notification.model.NotificationDto;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
    public void readNotification(@AuthenticationPrincipal User user, @PathVariable Long id) {
        notificationService.readNotification(user, id);
    }

    @DeleteMapping("{id}")
    public void deleteNotification(@AuthenticationPrincipal User user, @PathVariable Long id) {
        notificationService.deleteNotification(user, id);
    }
}
