package io.dondany.fc.notification;

import io.dondany.fc.notification.model.NotificationDto;
import io.dondany.fc.notification.model.NotificationMapper;
import io.dondany.fc.notification.model.NotificationPayload;
import io.dondany.fc.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<NotificationDto> getNotifications(User user) {
        return notificationRepository.findAllByRecipient(user)
                .stream()
                .map(NotificationMapper.INSTANCE::map)
                .toList();
    }

    public Notification createNotification(User user, String message, String type) {
        return createNotification(user, message, type, null);
    }

    public Notification createNotification(User user, String message, String type, NotificationPayload payload) {
        Notification notification = new Notification();
        notification.setRecipient(user);
        notification.setMessage(message);
        notification.setType(type);
        notification.setPayload(payload);
        return notificationRepository.save(notification);
    }

    public void readNotification(User user, Long id) {
        Notification notification = notificationRepository.findByIdAndRecipient(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public void deleteNotification(User user, Long id) {
        Notification notification = notificationRepository.findByIdAndRecipient(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        notificationRepository.delete(notification);
    }
}
