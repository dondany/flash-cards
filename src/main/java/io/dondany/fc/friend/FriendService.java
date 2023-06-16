package io.dondany.fc.friend;

import io.dondany.fc.friend.model.AddFriendDto;
import io.dondany.fc.friend.model.FriendInfoDto;
import io.dondany.fc.friend.model.FriendInfoMapper;
import io.dondany.fc.notification.Notification;
import io.dondany.fc.notification.NotificationService;
import io.dondany.fc.notification.model.FriendNotificationPayload;
import io.dondany.fc.project.Project;
import io.dondany.fc.user.User;
import io.dondany.fc.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    private final NotificationService notificationService;

    public List<FriendInfoDto> getFriends(User user) {
        return friendRepository.findAllByFriendOne(user)
                .stream()
                .map(FriendInfoMapper.INSTANCE::map)
                .toList();
    }

    @Transactional
    public FriendInfoDto addFriend(User userOne, AddFriendDto addFriendDto) {
        if (userOne.getId().equals(addFriendDto.getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A user can't befriend himself!");
        }
        User userTwo = userRepository.findById(addFriendDto.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Friend friend = new Friend();
        friend.setFriendOne(userOne);
        friend.setFriendTwo(userTwo);


        FriendInfoDto friendInfoDto = FriendInfoMapper.INSTANCE.map(friendRepository.save(friend));
        createFriendNotification(friend);
        return friendInfoDto;
    }

    private void createFriendNotification(Friend friend) {
        notificationService.createNotification(
                friend.getFriendTwo(),
                String.format("User %s added You as a friend!", friend.getFriendOne().getUsername()),
                "friend-request",
                new FriendNotificationPayload(friend.getId())
        );
    }
}
