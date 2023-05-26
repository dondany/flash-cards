package io.dondany.fc.notification;

import io.dondany.fc.notification.model.NotificationDto;
import io.dondany.fc.notification.model.NotificationMapper;
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
        return notificationRepository.findAllByRecipientId(user.getId())
                .stream()
                .map(NotificationMapper.INSTANCE::map)
                .toList();
    }

    public Notification createNotification(User user, String message) {
        Notification notification = new Notification();
        notification.setRecipient(user);
        notification.setMessage(message);
        return notificationRepository.save(notification);
    }

    public void readNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
