package io.dondany.fc.notification;

import io.dondany.fc.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByRecipient(User user);
    Optional<Notification> findByIdAndRecipient(Long id, User user);
}
